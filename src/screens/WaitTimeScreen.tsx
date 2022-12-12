import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { Button, WhiteSpace } from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";
import { LOCATION_DETAILS } from "@constants/routes";

export const WaitTimeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StyledText style={styles.huge}>Wait Times</StyledText>
      <WhiteSpace />
      <Button
        type={"primary"}
        onPress={() =>
          navigation.navigate(LOCATION_DETAILS, { location: "Location X" })
        }
      >
        <StyledText>Go to Location X</StyledText>
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
