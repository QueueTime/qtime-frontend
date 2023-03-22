import React, { useState, useEffect, SetStateAction, Dispatch } from "react";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import * as Location from "expo-location";

import {
  createUserIfNotExists,
  firestoreDocToUserProfile,
  subscribeToUserUpdates,
} from "@utils/firestore";
import { displayError } from "@utils/error";
import { LOCATION_TASK_NAME } from "@hooks/backgroundTrackingTask";

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
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TASK_NAME
  );
  if (hasStarted) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  }
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
 *    - Fetch user information from Google Identity provider and store in `user`.
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
    const subscriber = auth().onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
        if (isFirebaseInitializing) setFirebaseInitializing(false);
      } else if (!user.email) {
        displayError("Cannot sign in. User account has no email.");
        setUser(null);
        if (isFirebaseInitializing) setFirebaseInitializing(false);
      } else {
        // User is signed in, but might not be in firebase yet
        createUserIfNotExists(
          user,
          user.email,
          (userDoc) => {
            setUserProfile(
              firestoreDocToUserProfile(userDoc.id, userDoc.data()!)
            );
            setUser(user);
            // Small delay required for BaseNavigator component to re-render using new Auth context values
            // Prevents a "flicker" of user sign-in screen before the home screen
            setTimeout(() => {
              if (isFirebaseInitializing) setFirebaseInitializing(false);
            }, 200);
          },
          (error) => {
            if (isFirebaseInitializing) setFirebaseInitializing(false);
            displayError(
              `Failed to sign in. Try again later. ${
                error?.response?.data?.message || error
              }`
            );
          }
        );
      }
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
      if (data) setUserProfile(firestoreDocToUserProfile(doc.id, data));
    });
    return () => subscriber(); // unsubscribe on unmount
  }, [user]);

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

export interface IUserProfile {
  email: string;
  hasCompletedOnboarding: boolean;
  hasUsedReferralCode: boolean;
  notificationSetting: boolean;
  numLinesParticipated: number;
  poiFrequency: Map<string, number>;
  referralCode: string;
  rewardPointBalance: number;
  timeInLine: number;
}
