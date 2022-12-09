import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, WhiteSpace } from "@ant-design/react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up Test.tsx to start working on your app!</Text>
      <WhiteSpace />
      <Button type={"primary"}>
        <Text>Sample Button Text</Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
