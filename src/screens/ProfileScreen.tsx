import { useContext, useMemo } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";

import { View, List } from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";
import * as ROUTES from "@constants/routes";
import { ProfileScreenProps } from "@navigators/ProfileStackNavigator";
import { AuthContext } from "@contexts/auth";
import { ThemeContext } from "@contexts/theme";

export const ProfileScreen = ({ navigation }: IProfileScreenProps) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const navigationOptions = [
    {
      name: "Suggest a new POI",
      onPress: () => navigation.navigate(ROUTES.SUGGEST_POI),
    },
    {
      name: "Notification Settings",
      onPress: () => navigation.navigate(ROUTES.NOTIFICATIONS),
    },
    {
      name: "App Appearance",
      onPress: () => navigation.navigate(ROUTES.THEME),
    },
    {
      name: "Help",
      onPress: () => {},
    },
    {
      name: "Delete Account",
      onPress: () => {},
    },
  ];

  const InfoSection = ({ text, subtext }: IInfoSectionProps) =>
    useMemo(
      () => (
        <View style={styles.infoContainer}>
          <StyledText fontWeight="bold">{text}</StyledText>
          <StyledText style={theme.styles.subText}>{subtext}</StyledText>
        </View>
      ),
      [text, subtext]
    );

  return (
    <ScrollView style={[theme.styles.screenContainer, styles.container]}>
      <View style={styles.header}>
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require("@assets/images/avatar.png")
          }
          style={styles.profileImg}
        />
        <View style={styles.profileInfo}>
          <StyledText fontWeight="bold" style={styles.name}>
            {user!.displayName}
          </StyledText>
          <StyledText style={styles.email}>{user!.email}</StyledText>
          <StyledText style={styles.points}>1271 points</StyledText>
        </View>
      </View>
      <List>
        <List.Item>
          <InfoSection
            text="Most frequented POI"
            subtext="Location 6 • 0.1 km away"
          />
        </List.Item>
        <List.Item>
          <InfoSection
            text="Time spent waiting in line"
            subtext="7 hrs 2 min"
          />
        </List.Item>
      </List>
      <List
        styles={{
          Body: { borderTopWidth: 0 },
          BodyBottomLine: { borderBottomWidth: 0 },
        }}
      >
        {navigationOptions.map(({ name, onPress }) => (
          <List.Item
            key={name}
            style={styles.navigationOption}
            arrow="horizontal"
            onPress={onPress}
          >
            <StyledText style={styles.navigationText} fontWeight="bold">
              {name}
            </StyledText>
          </List.Item>
        ))}
      </List>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0, // Override the padding on screen container to work with horizontal lines
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  profileImg: {
    resizeMode: "cover",
    overflow: "hidden",
    width: 100,
    height: 100,
    borderRadius: 999,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: { fontSize: 18 },
  email: { fontSize: 16, marginTop: -2 },
  points: { fontSize: 15, color: "grey", marginTop: -4 },
  infoContainer: {
    padding: 15,
  },
  navigationOption: {
    paddingLeft: 25,
    paddingRight: 10,
  },
  navigationText: {
    paddingVertical: 8,
  },
});

interface IProfileScreenProps {
  navigation: ProfileScreenProps["navigation"];
}

interface IInfoSectionProps {
  text: string;
  subtext: string;
}
