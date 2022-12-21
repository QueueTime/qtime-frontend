import { useContext } from "react";
import { StyleSheet, Image } from "react-native";

import { View } from "@ant-design/react-native";
<<<<<<< HEAD

import { StyledText } from "@components/StyledText";
import { ThemeContext } from "@contexts/theme";
import { GoogleSignInButton } from "@components/GoogleSignInButton";

export const SignInScreen = () => {
  const { theme } = useContext(ThemeContext);
=======
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { StyledText } from "@components/StyledText";
import { ThemeContext } from "@contexts/theme";
import { AuthContext } from "@contexts/auth";

export const SignInScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { signIn } = useContext(AuthContext);

  const googleButtonPress = async () => {
    try {
      await signIn();
    } catch (error) {
      // TODO: Error handling
      console.log(error);
    }
  };
>>>>>>> Create sign in screen

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Image
          style={styles.logo}
          source={require("@assets/images/QTimeLogoName.png")}
        />
        <StyledText style={[styles.title, theme.styles.primaryColor]}>
          Your time is valuable.
        </StyledText>
      </View>
      <Image
<<<<<<< HEAD
        style={styles.hourglass}
        source={require("@assets/images/Hourglass.png")}
      />
      <GoogleSignInButton />
=======
        style={{ resizeMode: "contain", height: 320 }}
        source={require("@assets/images/Hourglass.png")}
      />
      <GoogleSigninButton
        style={{ width: 200, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => googleButtonPress()}
      />
>>>>>>> Create sign in screen
    </View>
  );
};

const styles = StyleSheet.create({
  titleBox: {
    alignItems: "center",
  },
  title: {
    fontFamily: "WorkSans",
    fontWeight: "normal", // 700+ broken on Android. TODO: fix font weights
    fontSize: 26,
    letterSpacing: -0.5,
  },
  logo: {
    width: 150,
    resizeMode: "contain",
  },
<<<<<<< HEAD
  hourglass: { resizeMode: "contain", height: 320 },
=======
>>>>>>> Create sign in screen
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
});
