import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as ROUTES from "@constants/routes";
import { ReferralScreen } from "@screens/ReferralScreen";
import { OnboardingScreen } from "@screens/OnboardingScreen";
import { TermsOfServiceScreen } from "@screens/TermsOfServiceScreen";

// Types of parameters that are passed for each screen
type SignUpStackNavigatorParams = {
  [ROUTES.TERMS_OF_SERVICE]: undefined;
  [ROUTES.REFERRAL]: undefined;
  [ROUTES.ONBOARDING]: undefined;
};

// Stack component to use for navigation
const Stack = createNativeStackNavigator<SignUpStackNavigatorParams>();

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
    <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
  </Stack.Navigator>
);
