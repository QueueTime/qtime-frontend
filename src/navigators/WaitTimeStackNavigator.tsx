import { createStackNavigator } from "@react-navigation/stack";
import type { StackScreenProps } from "@react-navigation/stack";
import { Platform } from "react-native";

import { WaitTimeScreen } from "@screens/WaitTimeScreen";
import { LocationDetailsScreen } from "@screens/LocationDetailsScreen";
import * as ROUTES from "@constants/routes";

// Types of parameters that are passed for each screen
type WaitTimeStackNavigatorParams = {
  [ROUTES.WAIT_TIMES_HOME]: undefined;
  [ROUTES.LOCATION_DETAILS]: { location: string };
};

// Prop types for each of the screen in the navigator
// ... ({ navigation, route }: RouteNameScreenProps)
// OR navigation: RouteNameScreenProps['navigation']
//    route: RouteNameScreenProps['route']
export type WaitTimeScreenProps = StackScreenProps<
  WaitTimeStackNavigatorParams,
  typeof ROUTES.WAIT_TIMES_HOME
>;

export type LocationDetailsScreenProps = StackScreenProps<
  WaitTimeStackNavigatorParams,
  typeof ROUTES.LOCATION_DETAILS
>;

// Stack component to use for navigation
const Stack = createStackNavigator<WaitTimeStackNavigatorParams>();

/**
 * Handles navigation for the wait times section of the app
 */
export const WaitTimesNavigator = () => (
  <Stack.Navigator
    initialRouteName={ROUTES.WAIT_TIMES_HOME}
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name={ROUTES.WAIT_TIMES_HOME}
      component={WaitTimeScreen}
    />
    <Stack.Screen
      options={({ route }) => ({
        title: route.params.location,
        ...(Platform.OS === "ios" && {
          // Used to add padding to back button on ios
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRightContainerStyle: {
            paddingRight: 20, // Required to keep title centered
          },
        }),
      })}
      name={ROUTES.LOCATION_DETAILS}
      component={LocationDetailsScreen}
    />
  </Stack.Navigator>
);
