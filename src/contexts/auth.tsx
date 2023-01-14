import React, { useState, useEffect, SetStateAction, Dispatch } from "react";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { createUser, subscribeToUserUpdates } from "@utils/firestore";
import { displayError } from "@utils/error";

const AUTH_WEB_CLIENT_ID =
  "476284740655-hn9ftfe6at300fpgmn3i8282i3nignnj.apps.googleusercontent.com";

GoogleSignin.configure({
  webClientId: AUTH_WEB_CLIENT_ID,
});

/**
 * Sign-in method to be called when the user presses the google sign-in button
 * @returns Promise resolving to the user object returned by Firebase on auth
 */
const signIn = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

/**
 * Sign-out method revoking their access token and signing them out
 * of Firebase auth
 */
const signOut = async () => {
  await GoogleSignin.revokeAccess(); // Allows selection of Google account after sign-out
  await auth().signOut();
};

export const AuthContext = React.createContext<{
  user: FirebaseAuthTypes.User | null;
  userProfile: IUserProfile | null;
  signIn: () => Promise<FirebaseAuthTypes.UserCredential>;
  signOut: () => Promise<void>;
}>({
  user: null,
  userProfile: null,
  signIn,
  signOut,
});

/**
 * Authentication context provider.
 * Exposes the current `user`, `signIn` and `signOut` properties.
 *
 * `user` is the authenticated Google user of the app. Null if no user is authenticated.
 * `userProfile` is the user profile data for the authenticated user pulled from firebase.
 * `signIn()` signs in the current user using Google sign in.
 * `signOut()` signs out the current user. Will subsequently set the user to null.
 *
 * Usage:
 * ```js
 * import { statusCodes } from "@react-native-google-signin/google-signin";
 * import { AuthContext } from "@contexts/auth";
 * const { user, signIn, signOut } = useContext(AuthContext);
 *
 * if(user) {
 *     // Display user information
 *     // user.displayName, ...
 * }
 *
 * async function foo() {
 *  try {
 *      const user = await signIn();
 *  } catch(error) {
 *      if(error.code === statusCodes.SIGN_IN_CANCELLED) {
 *          // User cancelled sign-in flow
 *      }
 *  }
 * }
 * ```
 *
 * Authentication Flow Details:
 *  1. User signs-in
 *    - Fetch user information from Google Identify provider and store in `user`
 *    - (If new user) Create a new document in firestore collection. Set `hasCompletedOnboarding` to false.
 *      - Once user completes onboarding flow (TOS, referral, etc.), sets `hasCompletedOnboarding` to true.
 *    - Subscribe to updates on user document. Store the firestore document data in `userProfile`.
 *  2. Backend updates user document (e.g. more points are added)
 *    - Subscription to user document will update `userProfile` and re-draw all components that depend on its state.
 *  3. User signs out
 *    - Set `user` and `userProfile` to null. Resolve all subscriptions.
 *  4. User deletes account
 *    - Delete user document in firestore database containing user data.
 *    - Cannot remove record of Google sign-in.
 *    - Set `user` and `userProfile` to null. Resolve all subscriptions.
 */
export const AuthProvider = ({
  children,
  isFirebaseInitializing,
  setFirebaseInitializing,
}: IAuthProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState) => {
      setUser(userState);
      if (isFirebaseInitializing) setFirebaseInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user?.email) {
      setUserProfile(null);
      return;
    }
    // Subscribe to updates about the user and update userProfile
    const subscriber = subscribeToUserUpdates(user.email, async (doc) => {
      const data = doc.data();
      if (data) {
        setUserProfile({
          email: doc.id,
          hasCompletedOnboarding: data.hasCompletedOnboarding,
        });
      } else {
        // Create a new user if one doesn't already exist to subscribe to
        try {
          await createUser(user.email!);
        } catch (error) {
          displayError(`Cannot create new account. Try again later. ${error}`);
        }
      }
    });
    return () => subscriber(); // unsubscribe on unmount
  }, [user?.email]);

  return (
    <AuthContext.Provider value={{ user, userProfile, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

interface IAuthProviderProps {
  children: React.ReactNode;
  isFirebaseInitializing: boolean;
  setFirebaseInitializing: Dispatch<SetStateAction<boolean>>;
}

interface IUserProfile {
  email: string;
  hasCompletedOnboarding: boolean;
}
