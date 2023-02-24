import { View, StyleSheet } from "react-native";
// import UserLocation from "../UserLocation";
import LTest from "../location";

export const MapScreen = () => (
  <View style={styles.container}>{<LTest />}</View>
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
