import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import { RewardsScreen } from "@screens/RewardsScreen";
import { MapScreen } from "@screens/MapScreen";
import * as ROUTES from "@constants/routes";
import { ProfileStackNavigator } from "@navigators/ProfileStackNavigator";
import { WaitTimesNavigator } from "@navigators/WaitTimeStackNavigator";

// Tab component to use for navigation
const Tab = createBottomTabNavigator();

const ICON_ADJUSTMENT_FACTOR = 5;

const styles = StyleSheet.create({
  tabBarLabels: {
    marginBottom: 4,
    marginTop: -3,
    fontSize: 11,
  },
});

/**
 * Handles tab navigation for the main section of the app
 */
export const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ tabBarLabelStyle: styles.tabBarLabels }}>
    <Tab.Screen
      name={ROUTES.WAIT_TIMES}
      component={WaitTimesNavigator}
      options={{
        title: "Wait Times",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Feather
            name="clock"
            size={size - ICON_ADJUSTMENT_FACTOR}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.MAP}
      component={MapScreen}
      options={{
        title: "Map",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Feather
            name="map-pin" // Alternatively: "navigation"
            size={size - ICON_ADJUSTMENT_FACTOR}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.REWARDS}
      component={RewardsScreen}
      options={{
        title: "Rewards",
        tabBarIcon: ({ color, size }) => (
          <Feather
            name="gift"
            size={size - ICON_ADJUSTMENT_FACTOR}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.PROFILE}
      component={ProfileStackNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <SimpleLineIcons
            name="user"
            size={size - ICON_ADJUSTMENT_FACTOR}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);
