import { StyleSheet, View } from "react-native";

import { Button, WhiteSpace } from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";
import * as ROUTES from "@constants/routes";
import { ProfileScreenProps } from "@navigators/ProfileStackNavigator";

export const ProfileScreen = ({ navigation }: IProfileScreenProps) => (
  <View style={styles.container}>
    <StyledText style={styles.huge}>Profile Page</StyledText>
    <WhiteSpace />
    <Button
      type={"primary"}
      onPress={() => navigation.navigate(ROUTES.SUGGEST_POI)}
    >
      <StyledText>Go to POI Suggestion</StyledText>
    </Button>
    <Button
      type={"primary"}
      onPress={() => navigation.navigate(ROUTES.NOTIFICATIONS)}
    >
      <StyledText>Go to notifications</StyledText>
    </Button>
    <Button type={"primary"} onPress={() => navigation.navigate(ROUTES.THEME)}>
      <StyledText>Go to appearance settings</StyledText>
    </Button>
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

interface IProfileScreenProps {
  navigation: ProfileScreenProps["navigation"];
}
