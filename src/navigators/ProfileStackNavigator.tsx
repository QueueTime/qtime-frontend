import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { POISuggestionScreen } from "@screens/POISuggestionScreen";
import * as ROUTES from "@constants/routes";
import { NotificationsScreen } from "@screens/NotificationScreen";
import { ThemeScreen } from "@screens/ThemeScreen";
import { ProfileScreen } from "@screens/ProfileScreen";

// Stack component to use for navigation
const Stack = createNativeStackNavigator();

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
