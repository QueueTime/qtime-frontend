import { createStackNavigator } from "@react-navigation/stack";
import type { StackScreenProps } from "@react-navigation/stack";

import * as ROUTES from "@constants/routes";
import { ReferralScreen } from "@screens/ReferralScreen";
import { OnboardingScreenForNavigator } from "@screens/OnboardingScreen";
import { TermsOfServiceScreen } from "@screens/TermsOfServiceScreen";

// Types of parameters that are passed for each screen
type SignUpStackNavigatorParams = {
  [ROUTES.TERMS_OF_SERVICE]: undefined;
  [ROUTES.REFERRAL]: undefined;
  [ROUTES.ONBOARDING]: undefined;
};

// Prop types for each of the screen in the navigator
// ... ({ navigation, route }: RouteNameScreenProps)
// OR navigation: RouteNameScreenProps['navigation']
//    route: RouteNameScreenProps['route']
export type TermsOfServiceScreenProps = StackScreenProps<
  SignUpStackNavigatorParams,
  typeof ROUTES.TERMS_OF_SERVICE
>;

export type ReferralScreenProps = StackScreenProps<
  SignUpStackNavigatorParams,
  typeof ROUTES.REFERRAL
>;

export type OnboardingScreenProps = StackScreenProps<
  SignUpStackNavigatorParams,
  typeof ROUTES.ONBOARDING
>;

// Stack component to use for navigation
const Stack = createStackNavigator<SignUpStackNavigatorParams>();

export const SignUpStackNavigator = () => (
  <Stack.Navigator
    initialRouteName={ROUTES.TERMS_OF_SERVICE}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen
      name={ROUTES.TERMS_OF_SERVICE}
      component={TermsOfServiceScreen}
    />
    <Stack.Screen name={ROUTES.REFERRAL} component={ReferralScreen} />
    <Stack.Screen
      name={ROUTES.ONBOARDING}
      component={OnboardingScreenForNavigator}
    />
  </Stack.Navigator>
);
