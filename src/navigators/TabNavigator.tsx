import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RewardsScreen } from "@screens/RewardsScreen";
import { MapScreen } from "@screens/MapScreen";
import * as ROUTES from "@constants/routes";
import { ProfileStackNavigator } from "@navigators/ProfileStackNavigator";
import { WaitTimesNavigator } from "@navigators/WaitTimeStackNavigator";

// Tab component to use for navigation
const Tab = createBottomTabNavigator();

/**
 * Handles tab navigation for the main section of the app
 */
export const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={ROUTES.WAIT_TIMES}
      component={WaitTimesNavigator}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      options={{ headerShown: false }}
      name={ROUTES.MAP}
      component={MapScreen}
    />
    <Tab.Screen
      options={{ title: "Rewards" }}
      name={ROUTES.REWARDS}
      component={RewardsScreen}
    />
    <Tab.Screen
      name={ROUTES.PROFILE}
      component={ProfileStackNavigator}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);
