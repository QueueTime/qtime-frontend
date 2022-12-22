import { useContext } from "react";
import { StyleSheet, Image } from "react-native";

import { View } from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";
import { ThemeContext } from "@contexts/theme";
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
      <GoogleSignInButton />
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
  hourglass: { resizeMode: "contain", height: 320 },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
});
