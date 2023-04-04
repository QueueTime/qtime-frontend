import { useContext, useEffect, useState } from "react";
import { StyleSheet, Image, View } from "react-native";

import * as AppleAuthentication from "expo-apple-authentication";

import { StyledText } from "@components/StyledText";
import { ThemeContext } from "@contexts/theme";
import { GoogleSignInButton } from "@components/GoogleSignInButton";
import { AppleSignInButton } from "@components/AppleSignInButton";

export const SignInScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
  }, []);

  return (
    <View style={[theme.styles.screenContainer, styles.container]}>
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
        style={styles.hourglass}
        source={require("@assets/images/Hourglass.png")}
      />
      <View style={styles.buttons}>
        <GoogleSignInButton />
        {isAppleLoginAvailable && <AppleSignInButton />}
      </View>
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
  hourglass: {
    resizeMode: "contain",
    height: 320,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
});
