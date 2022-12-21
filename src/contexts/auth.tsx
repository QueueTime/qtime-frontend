import React, { useState, useEffect, SetStateAction, Dispatch } from "react";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

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
  await GoogleSignin.revokeAccess(); // Allows selection of Google account on sign-out
  await auth().signOut();
};

export const AuthContext = React.createContext<{
  user: FirebaseAuthTypes.User | null;
  signIn: () => Promise<FirebaseAuthTypes.UserCredential>;
  signOut: () => Promise<void>;
}>({
  user: null,
  signIn,
  signOut,
});

/**
 * Authentication context provider.
 * Exposes the current `user`, `signIn` and `signOut` properties.
 *
 * `user` is the authenticated user of the app. Null if no user is authenticated.
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
 *     // user.name, ...
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
 */
export const AuthProvider = ({
  children,
  isFirebaseInitializing,
  setFirebaseInitializing,
}: IAuthProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState) => {
      setUser(userState);
      if (isFirebaseInitializing) setFirebaseInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

interface IAuthProviderProps {
  children: React.ReactNode;
  isFirebaseInitializing: boolean;
  setFirebaseInitializing: Dispatch<SetStateAction<boolean>>;
}
