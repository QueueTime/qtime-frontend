import { useContext } from "react";
import { StyleSheet, Image } from "react-native";

import { View } from "@ant-design/react-native";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

import { StyledText } from "@components/StyledText";
import { ThemeContext } from "@contexts/theme";
import { GoogleSignInButton } from "@components/GoogleSignInButton";

export const SignInScreen = () => {
  const { theme } = useContext(ThemeContext);
=======
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
=======
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
>>>>>>> Rework google sign in button to be custom
=======
>>>>>>> Remove extra imports

import { StyledText } from "@components/StyledText";
import { ThemeContext } from "@contexts/theme";
import { GoogleSignInButton } from "@components/GoogleSignInButton";

export const SignInScreen = () => {
  const { theme } = useContext(ThemeContext);
<<<<<<< HEAD
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
=======
>>>>>>> Rework google sign in button to be custom

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Image
          style={styles.logo}
          source={require("@assets/images/QTimeLogoName.png")}
        />
        <StyledText
          fontWeight="bold"
          style={[styles.title, theme.styles.primaryColor]}
        >
          Your time is valuable.
        </StyledText>
      </View>
      <Image
<<<<<<< HEAD
<<<<<<< HEAD
        style={styles.hourglass}
        source={require("@assets/images/Hourglass.png")}
      />
      <GoogleSignInButton />
=======
        style={{ resizeMode: "contain", height: 320 }}
=======
        style={styles.hourglass}
>>>>>>> Fix style to be in stylesheet
        source={require("@assets/images/Hourglass.png")}
      />
<<<<<<< HEAD
      <GoogleSigninButton
        style={{ width: 200, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => googleButtonPress()}
      />
>>>>>>> Create sign in screen
=======
      <GoogleSignInButton />
>>>>>>> Rework google sign in button to be custom
    </View>
  );
};

const styles = StyleSheet.create({
  titleBox: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
  },
  logo: {
    width: 150,
    resizeMode: "contain",
  },
<<<<<<< HEAD
<<<<<<< HEAD
  hourglass: { resizeMode: "contain", height: 320 },
=======
>>>>>>> Create sign in screen
=======
  hourglass: { resizeMode: "contain", height: 320 },
>>>>>>> Fix style to be in stylesheet
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
});
