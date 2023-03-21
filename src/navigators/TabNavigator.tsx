import { useEffect, useContext } from "react";
import { OpaqueColorValue, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useRecoilValue } from "recoil";
import { setRecoil } from "recoil-nexus";

import { RewardsScreen } from "@screens/RewardsScreen";
import { MapScreen } from "@screens/MapScreen";
import * as ROUTES from "@constants/routes";
import { ProfileStackNavigator } from "@navigators/ProfileStackNavigator";
import { WaitTimesNavigator } from "@navigators/WaitTimeStackNavigator";
import { useLocationPermission } from "@hooks/checkLocationPermission";
import { useBackgroundLocation } from "@hooks/backgroundTrackingTask";
import {
  apiLastCalledTimestampState,
  userGeolocationState,
} from "@atoms/geolocationAtom";
import { AuthContext } from "@contexts/auth";
import { sourcingApi } from "@api/client/apis";

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
  const { user } = useContext(AuthContext);
  const { latitude, longitude, timestamp } =
    useRecoilValue(userGeolocationState);
  const apiTimestamp = useRecoilValue(apiLastCalledTimestampState);
  useLocationPermission();
  useBackgroundLocation();

  useEffect(() => {
    const callLocationAPI = async () => {
      try {
        sourcingApi.updateUserLocation(
          {
            latitude: latitude,
            longitude: longitude,
          },
          {
            headers: {
              Authorization: `Bearer ${await user!.getIdToken()}`,
            },
          }
        );
        setRecoil(apiLastCalledTimestampState, Date.now());
      } catch (error) {}
    };
    if (
      latitude !== 0 &&
      longitude !== 0 &&
      (Date.now() - apiTimestamp) / 1000 > 9
    ) {
      callLocationAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, timestamp, user]);

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
