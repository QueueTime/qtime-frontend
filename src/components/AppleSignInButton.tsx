import { useContext } from "react";
import { StyleSheet } from "react-native";

import { Toast } from "@ant-design/react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import auth from "@react-native-firebase/auth";

import { ThemeContext } from "@contexts/theme";

export const AppleSignInButton = () => {
  const { theme } = useContext(ThemeContext);

  const appleButtonPress = async () => {
    const nonce = Math.random().toString(36).substring(2, 10);
    try {
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce
      );
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });
      const { identityToken } = appleCredential;
      const providerCredential = auth.AppleAuthProvider.credential(
        identityToken!,
        nonce
      );
      return auth().signInWithCredential(providerCredential);
    } catch (error: any) {
      switch (error.code) {
        case "ERR_REQUEST_CANCELED":
          // user cancelled the login flow, fail silently
          break;
        default:
          // Some other unexpected error
          Toast.info({
            content: `Cannot complete sign in due to unexpected error. ${error}`,
            duration: Toast.SHORT,
          });
      }
    }
  };

  return (
    <AppleAuthentication.AppleAuthenticationButton
      style={styles.button}
      buttonStyle={
        theme.name === "light"
          ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
          : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
      }
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      cornerRadius={5}
      onPress={appleButtonPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: "85%",
    height: 45,
    marginTop: 20,
  },
});
