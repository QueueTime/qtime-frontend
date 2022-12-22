import { useContext } from "react";
import { Text, Image, StyleSheet } from "react-native";

import { Button, View } from "@ant-design/react-native";

import { ThemeContext } from "@contexts/theme";
import { AuthContext } from "@contexts/auth";

export const GoogleSignInButton = () => {
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
