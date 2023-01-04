import { useContext } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";

import { Button, WhiteSpace, View, List } from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";
import * as ROUTES from "@constants/routes";
import { ProfileScreenProps } from "@navigators/ProfileStackNavigator";
import { AuthContext } from "@contexts/auth";
import { ThemeContext } from "@contexts/theme";

export const ProfileScreen = ({ navigation }: IProfileScreenProps) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView style={[theme.styles.screenContainer, styles.container]}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: user?.photoURL
              ? user.photoURL
              : require("@assets/images/GoogleLogo.png"), // Todo need default profile
          }}
          style={styles.profileImg}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <StyledText fontWeight="bold" style={{ fontSize: 18 }}>
            {user!.displayName}
          </StyledText>
          <StyledText style={{ fontSize: 16, marginTop: -2 }}>
            {user!.email}
          </StyledText>
          <StyledText style={{ fontSize: 15, color: "grey", marginTop: -4 }}>
            1271 points
          </StyledText>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.infoContainer}>
        <List>
          <List.Item>Item 1</List.Item>
          <List.Item>Item 1</List.Item>
        </List>
      </View>
      <View style={styles.horizontalLine} />
    </ScrollView>
    // <View style={styles.container}>
    //   <StyledText style={styles.huge}>Profile Page</StyledText>
    //   <WhiteSpace />
    //   <StyledText style={styles.huge}>{`Hi ${user!.displayName}!`}</StyledText>
    //   <WhiteSpace />

    //   <Button
    //     type={"primary"}
    //     onPress={() => navigation.navigate(ROUTES.SUGGEST_POI)}
    //   >
    //     <StyledText>Go to POI Suggestion</StyledText>
    //   </Button>
    //   <WhiteSpace />
    //   <Button
    //     type={"primary"}
    //     onPress={() => navigation.navigate(ROUTES.NOTIFICATIONS)}
    //   >
    //     <StyledText>Go to notifications</StyledText>
    //   </Button>
    //   <WhiteSpace />
    //   <Button
    //     type={"primary"}
    //     onPress={() => navigation.navigate(ROUTES.THEME)}
    //   >
    //     <StyledText>Go to appearance settings</StyledText>
    //   </Button>
    // </View>
  );
};

const styles = StyleSheet.create({
  huge: {
    fontSize: 20,
  },
  container: {
    //backgroundColor: "red",
    padding: 0,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    //backgroundColor: "green",
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 30,
  },
  infoContainer: {
    //backgroundColor: "lightblue",
    padding: 25,
  },
  profileImg: {
    resizeMode: "cover",
    overflow: "hidden",
    width: 100,
    height: 100,
    borderRadius: 999,
    marginRight: 20,
  },
  horizontalLine: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

interface IProfileScreenProps {
  navigation: ProfileScreenProps["navigation"];
}
