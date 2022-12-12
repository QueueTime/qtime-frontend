import { Text, View, StyleSheet } from "react-native";

export const LocationDetailsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.huge}>Location Details Screen</Text>
  </View>
);

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
