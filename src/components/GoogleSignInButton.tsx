import { useContext } from "react";
import { Text, Image, StyleSheet } from "react-native";

import { Button, View, Toast } from "@ant-design/react-native";
import { statusCodes } from "@react-native-google-signin/google-signin";

import { ThemeContext } from "@contexts/theme";
import { AuthContext } from "@contexts/auth";

export const GoogleSignInButton = () => {
  const { theme } = useContext(ThemeContext);
  const { signIn } = useContext(AuthContext);

  const googleButtonPress = async () => {
    try {
      await signIn();
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // user cancelled the login flow, fail silently
          break;
        case statusCodes.IN_PROGRESS:
          // operation (e.g. sign in) is in progress already
          Toast.info({
            content: "Cannot complete sign in. Operation already in progress.",
            duration: Toast.SHORT,
          });
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // play services not available or outdated
          Toast.info({
            content:
              "Cannot complete sign in. Google Play Services not available or outdated.",
            duration: Toast.SHORT,
          });
        default:
          // Some other unexpected error
          Toast.info({
            content: `Cannot complete sign in due to unexpected error. ${error}`,
            duration: Toast.SHORT,
          });
          break;
      }
    }
  };

  return (
    <Button
      type="ghost"
      style={styles.button}
      onPress={() => googleButtonPress()}
    >
      <Image
        style={styles.logo}
        source={require("@assets/images/GoogleLogo.png")}
      />
      <View style={styles.textContainer}>
        <Text style={theme.styles.primaryColor}>Sign in with Google</Text>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "85%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    width: 35,
    height: 28,
    marginRight: 5,
  },
  textContainer: {
    justifyContent: "center",
  },
});
