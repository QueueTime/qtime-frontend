// This file includes test utils for testing with Jest
import { render } from "@testing-library/react-native";
import { mock } from "jest-mock-extended";
import { ReactNode } from "react";

import { AuthContext } from "@contexts/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { IUserProfile } from "@contexts/auth";

/**
 * Helper to render components inside a mocked auth context
 * @param children Component to render inside the auth context
 */
export const renderWithAuthContext = (
  children: ReactNode,
  user: FirebaseAuthTypes.User = mock<FirebaseAuthTypes.User>(),
  userProfile: IUserProfile = mock<IUserProfile>(),
  signIn: jest.Mock<any, any> = jest.fn(),
  signOut: jest.Mock<any, any> = jest.fn()
) =>
  render(
    <AuthContext.Provider
      value={{
        user: user,
        userProfile: userProfile,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
