import { useContext, useMemo, useState } from "react";
import { StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";

import { View, List, Modal, Toast } from "@ant-design/react-native";
import { Feather } from "@expo/vector-icons";

import { StyledText } from "@components/StyledText";
import * as ROUTES from "@constants/routes";
import { ProfileScreenProps } from "@navigators/ProfileStackNavigator";
import { AuthContext } from "@contexts/auth";
import { ThemeContext } from "@contexts/theme";
import { displayError } from "@utils/error";
import { OnboardingScreen } from "@screens/OnboardingScreen";
import { userApi } from "@api/client/apis";
import { toHoursAndMinutes } from "@utils/time";

const copyToClipboard = async (content: string) => {
  await Clipboard.setStringAsync(content);
  Toast.info({
    content: "Copied!",
    duration: 1,
    mask: false,
  });
};

export const ProfileScreen = ({ navigation }: IProfileScreenProps) => {
  const { user, userProfile, signOut } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [showHelpModal, setShowHelpModal] = useState(false);

  // Navigation details for the list of buttons at the bottom of the screen
  const navigationOptions = [
    {
      name: "Notification Settings",
      onPress: () => navigation.navigate(ROUTES.NOTIFICATIONS),
    },
    {
      name: "App Appearance",
      onPress: () => navigation.navigate(ROUTES.THEME),
    },
    {
      name: "Suggest a new location",
      onPress: () => navigation.navigate(ROUTES.SUGGEST_POI),
    },
    {
      name: "Help",
      onPress: () => setShowHelpModal(true),
    },
    {
      name: "Delete Account",
      onPress: () => {
        Modal.alert(
          <StyledText style={styles.deleteModalTitle}>
            Are you sure you want to delete your account?
          </StyledText>,
          <StyledText style={styles.deleteModalBody}>
            All data associated with your account will be lost, including any
            reward points.
          </StyledText>,
          [
            {
              text: "Cancel",
              style: { color: theme.styles.text.color },
            },
            {
              text: "Yes, delete it",
              onPress: async () => {
                try {
                  // Fetch token *before* signing out
                  const token = await user!.getIdToken();
                  await signOut();
                  await userApi.deleteUserProfile({
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                } catch (error) {
                  displayError(
                    `Failed to delete user account. Try again later. ${error}`
                  );
                }
              },
              style: { color: "red" },
            },
          ],
          () => true
        );
      },
    },
  ];

  // Helper sub-component to render the info sections of the profile screen
  const InfoSection = ({ text, subtext }: IInfoSectionProps) =>
    useMemo(
      () => (
        <View style={styles.infoContainer}>
          <StyledText>{text}</StyledText>
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
          <StyledText style={styles.points}>
            {userProfile?.rewardPointBalance || 0} points
          </StyledText>
        </View>
      </View>
      <View style={styles.referralBox}>
        <StyledText>Your Unique Referral Code</StyledText>
        <TouchableOpacity
          onPress={() => copyToClipboard(userProfile!.referralCode)}
          style={styles.halfWidth}
        >
          <View style={[styles.referralRow]}>
            <StyledText
              style={[theme.styles.primaryColor, styles.referralCode]}
            >
              {userProfile!.referralCode}
            </StyledText>
            <Feather
              name="copy"
              size={18}
              color={theme.styles.primaryColor.color}
              style={styles.copyIcon}
            />
          </View>
        </TouchableOpacity>
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
            subtext={toHoursAndMinutes(userProfile!.timeInLine)}
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
      <Modal
        transparent={false}
        visible={showHelpModal}
        animationType="slide-up"
        onRequestClose={() => {
          setShowHelpModal(false);
          return false; // Allows hardware back button events
        }}
        style={styles.helpModal}
      >
        <OnboardingScreen onExit={() => setShowHelpModal(false)} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0, // Override the padding on screen container to work with horizontal lines
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 18,
  },
  referralBox: {
    paddingHorizontal: 25,
    paddingBottom: 16,
  },
  referralRow: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "flex-start",
  },
  referralCode: {
    fontSize: 20,
  },
  copyIcon: {
    marginLeft: 6,
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
  deleteModalTitle: {
    fontSize: 18,
  },
  deleteModalBody: {
    textAlign: "center",
  },
  helpModal: {
    height: "100%",
    width: "100%",
    paddingTop: 15,
  },
  halfWidth: {
    maxWidth: "50%",
  },
});

interface IProfileScreenProps {
  navigation: ProfileScreenProps["navigation"];
}

interface IInfoSectionProps {
  text: string;
  subtext: string;
}
