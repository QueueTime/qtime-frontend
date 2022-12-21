import { useContext } from "react";
import { StyleSheet, Image } from "react-native";

import { View } from "@ant-design/react-native";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { StyledText } from "@components/StyledText";
import { ThemeContext } from "@contexts/theme";
import { AuthContext } from "@contexts/auth";
import { GoogleSignInButton } from "@components/GoogleSignInButton";

export const SignInScreen = () => {
  const { theme } = useContext(ThemeContext);

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
        style={{ resizeMode: "contain", height: 320 }}
        source={require("@assets/images/Hourglass.png")}
      />
      <GoogleSignInButton />
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
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
});
