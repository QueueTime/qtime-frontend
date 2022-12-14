import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { POISuggestionScreen } from "@screens/POISuggestionScreen";
import * as ROUTES from "@constants/routes";
import { NotificationsScreen } from "@screens/NotificationScreen";
import { ThemeScreen } from "@screens/ThemeScreen";
import { ProfileScreen } from "@screens/ProfileScreen";

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
export const ProfileStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ title: "Profile" }}
      name={ROUTES.PROFILE_HOME}
      component={ProfileScreen}
    />
    <Stack.Screen
      options={{ title: "Suggest a new POI" }}
      name={ROUTES.SUGGEST_POI}
      component={POISuggestionScreen}
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
