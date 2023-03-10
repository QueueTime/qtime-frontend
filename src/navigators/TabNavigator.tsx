import { useEffect, useState, useRef } from "react";
import { OpaqueColorValue, StyleSheet, AppState } from "react-native";

import * as Location from "expo-location";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { RewardsScreen } from "@screens/RewardsScreen";
import { MapScreen } from "@screens/MapScreen";
import * as ROUTES from "@constants/routes";
import { ProfileStackNavigator } from "@navigators/ProfileStackNavigator";
import { WaitTimesNavigator } from "@navigators/WaitTimeStackNavigator";
import { requestPermissions } from "@utils/permission";

// Types of parameters that are passed for each tab
type TabNavigatorParams = {
  [ROUTES.WAIT_TIMES]: undefined;
  [ROUTES.MAP]: undefined;
  [ROUTES.REWARDS]: undefined;
  [ROUTES.PROFILE]: undefined;
};

// Prop types for each of the screen/tab in the navigator
// ... ({ navigation, route }: RouteNameScreenProps)
// OR navigation: RouteNameScreenProps['navigation']
//    route: RouteNameScreenProps['route']
export type WaitTimeScreenProps = BottomTabScreenProps<
  TabNavigatorParams,
  typeof ROUTES.WAIT_TIMES
>;

export type MapScreenProps = BottomTabScreenProps<
  TabNavigatorParams,
  typeof ROUTES.MAP
>;

export type RewardsScreenProps = BottomTabScreenProps<
  TabNavigatorParams,
  typeof ROUTES.REWARDS
>;

export type ProfileScreenProps = BottomTabScreenProps<
  TabNavigatorParams,
  typeof ROUTES.PROFILE
>;

// Tab component to use for navigation
const Tab = createBottomTabNavigator<TabNavigatorParams>();

// Icon display functions
// These need to be defined outside the component to avoid unstable-nested-components warning
const renderFeatherIcon = (
  name: any,
  color: string | OpaqueColorValue,
  size: number
) => <Feather name={name} size={size - ICON_ADJUSTMENT_FACTOR} color={color} />;

const renderSimpleLineIcon = (
  name: any,
  color: string | OpaqueColorValue,
  size: number
) => (
  <SimpleLineIcons
    name={name}
    size={size - ICON_ADJUSTMENT_FACTOR}
    color={color}
  />
);

/**
 * Handles tab navigation for the main section of the app
 */
export const TabNavigator = () => {
  const appState = useRef(AppState.currentState);
  const [_, setAppStateVisible] = useState(appState.current);

  // Checking if the app is in foreground or background and triggering the fetch of background location permission each time the app is brought to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        Location.getBackgroundPermissionsAsync().then((response) => {
          if (!response.granted) {
            requestPermissions();
          }
        });
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  });

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.WAIT_TIMES}
      screenOptions={{
        tabBarLabelStyle: styles.tabBarLabels,
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name={ROUTES.WAIT_TIMES}
        component={WaitTimesNavigator}
        options={{
          title: "Wait Times",
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            renderFeatherIcon("clock", color, size),
        }}
      />
      <Tab.Screen
        name={ROUTES.MAP}
        component={MapScreen}
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            renderFeatherIcon("map-pin", color, size),
        }}
      />
      <Tab.Screen
        name={ROUTES.REWARDS}
        component={RewardsScreen}
        options={{
          title: "Rewards History",
          tabBarLabel: "Rewards",
          tabBarIcon: ({ color, size }) =>
            renderFeatherIcon("gift", color, size),
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            renderSimpleLineIcon("user", color, size),
        }}
      />
    </Tab.Navigator>
  );
};

const ICON_ADJUSTMENT_FACTOR = 5;

const styles = StyleSheet.create({
  tabBarLabels: {
    marginBottom: 4,
    marginTop: -3,
    fontSize: 11,
  },
});
