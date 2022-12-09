import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, WhiteSpace } from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";

const App = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    WorkSans: require("@assets/fonts/WorkSans.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.huge}>Default Font Family Sample Text</Text>
      <StyledText style={styles.huge}>
        WorkSans Font Family Sample Text
      </StyledText>
      <WhiteSpace />
      <Button type={"primary"}>
        <StyledText>Sample Button Text</StyledText>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  huge: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
