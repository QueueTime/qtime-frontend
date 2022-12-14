import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { WaitTimeScreen } from "@screens/WaitTimeScreen";
import { LocationDetailsScreen } from "@screens/LocationDetailsScreen";
import * as ROUTES from "@constants/routes";

// Types of parameters that are passed for each screen
type WaitTimeStackNavigatorParams = {
  [ROUTES.WAIT_TIMES_HOME]: undefined;
  [ROUTES.LOCATION_DETAILS]: { location: string };
};

// Prop types for each of the screen in the navigator
// ... ({ navigator, route }: RouteNameScreenProps)
// OR navigator: RouteNameScreenProps['navigator']
//    route: RouteNameScreenProps['route']
export type WaitTimeScreenProps = NativeStackScreenProps<
  WaitTimeStackNavigatorParams,
  typeof ROUTES.WAIT_TIMES_HOME
>;

export type LocationDetailsScreenProps = NativeStackScreenProps<
  WaitTimeStackNavigatorParams,
  typeof ROUTES.LOCATION_DETAILS
>;

// Stack component to use for navigation
const Stack = createNativeStackNavigator<WaitTimeStackNavigatorParams>();

/**
 * Handles navigation for the wait times section of the app
 */
export const WaitTimesNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTES.WAIT_TIMES_HOME}>
    <Stack.Screen
      options={{ headerShown: false }}
      name={ROUTES.WAIT_TIMES_HOME}
      component={WaitTimeScreen}
    />
    <Stack.Screen
      options={({ route }) => ({
        title: route.params.location,
      })}
      name={ROUTES.LOCATION_DETAILS}
      component={LocationDetailsScreen}
    />
  </Stack.Navigator>
);
