import { useContext, useMemo } from "react";
import { TouchableOpacity } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { statusCodes } from "@react-native-google-signin/google-signin";
import { Toast } from "@ant-design/react-native";

import { POISuggestionScreen } from "@screens/POISuggestionScreen";
import * as ROUTES from "@constants/routes";
import { NotificationsScreen } from "@screens/NotificationScreen";
import { ThemeScreen } from "@screens/ThemeScreen";
import { ProfileScreen } from "@screens/ProfileScreen";
import { AuthContext } from "@contexts/auth";
import { ThemeContext } from "@contexts/theme";
import { THEME_NAMES } from "@constants/theme";

// Types of parameters that are passed for each screen
type ProfileStackNavigatorParams = {
  [ROUTES.PROFILE_HOME]: undefined;
  [ROUTES.SUGGEST_POI]: undefined;
  [ROUTES.NOTIFICATIONS]: undefined;
  [ROUTES.THEME]: undefined;
};

// Prop types for each of the screen in the navigator
// ... ({ navigation, route }: RouteNameScreenProps)
// OR navigator: RouteNameScreenProps['navigation']
//    route: RouteNameScreenProps['route']
export type ProfileScreenProps = NativeStackScreenProps<
  ProfileStackNavigatorParams,
  typeof ROUTES.PROFILE_HOME
>;

export type POISuggestionScreenProps = NativeStackScreenProps<
  ProfileStackNavigatorParams,
  typeof ROUTES.SUGGEST_POI
>;

export type NotificationScreenProps = NativeStackScreenProps<
  ProfileStackNavigatorParams,
  typeof ROUTES.NOTIFICATIONS
>;

export type ThemeScreenProps = NativeStackScreenProps<
  ProfileStackNavigatorParams,
  typeof ROUTES.THEME
>;

// Stack component to use for navigation
const Stack = createNativeStackNavigator<ProfileStackNavigatorParams>();

/**
 * Handles navigation for the profile section of the app
 */
export const ProfileStackNavigator = () => {
  const { signOut } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const logoutButton = useMemo(() => {
    const handleSignOut = async () => {
      try {
        await signOut();
      } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          Toast.info({
            content: `No user signed in. Cannot sign out.`,
            duration: Toast.SHORT,
          });
        } else {
          Toast.info({
            content: `Failed to sign user out with error: ${error}`,
            duration: Toast.SHORT,
          });
        }
      }
    };
    return (
      <TouchableOpacity onPress={() => handleSignOut()}>
        <AntDesign
          name="logout"
          size={24}
          color={theme.name === THEME_NAMES.light ? "black" : "white"}
        />
      </TouchableOpacity>
    );
  }, [signOut, theme.name]);

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.PROFILE_HOME}
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name={ROUTES.PROFILE_HOME}
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerRight: () => logoutButton,
        }}
      />
      <Stack.Screen
        name={ROUTES.SUGGEST_POI}
        component={POISuggestionScreen}
        options={{ title: "Suggest a New Location" }}
      />
      <Stack.Screen
        options={{ title: "Notification Settings" }}
        name={ROUTES.NOTIFICATIONS}
        component={NotificationsScreen}
      />
      <Stack.Screen
        options={{ title: "App Appearance" }}
        name={ROUTES.THEME}
        component={ThemeScreen}
      />
    </Stack.Navigator>
  );
};
