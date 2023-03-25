import { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";

import { View, Button } from "@ant-design/react-native";

import { ThemeContext } from "@contexts/theme";
import { StyledText } from "@components/StyledText";
import { REFERRAL } from "@constants/routes";
import { TermsOfServiceScreenProps } from "@navigators/SignUpStackNavigator";
import { usePreventBack } from "@hooks/preventBack";

export const TermsOfServiceScreen = ({
  navigation,
}: ITermsOfServiceScreenProps) => {
  const { theme } = useContext(ThemeContext);

  // Prevent going back
  usePreventBack();

  const onAccept = async () => {
    navigation.navigate(REFERRAL);
  };

  return (
    <View style={[theme.styles.screenContainer, styles.container]}>
      <StyledText
        fontWeight="bold"
        style={[theme.styles.primaryColor, styles.title]}
      >
        Terms & Conditions
      </StyledText>
      <ScrollView style={styles.terms}>
        <StyledText fontWeight="bold" style={styles.termsHeader}>
          TERMS OF SERVICE
        </StyledText>
        <StyledText>FOR TESTING PURPOSES ONLY</StyledText>
        <StyledText style={styles.termsText}>{TERMS_OF_SERVICE}</StyledText>
      </ScrollView>
      <Button style={styles.acceptButton} type="primary" onPress={onAccept}>
        <StyledText style={styles.buttonText}>Accept</StyledText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 21,
  },
  terms: {
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#a8a7a7",
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 25,
  },
  termsHeader: {
    fontSize: 20,
    marginTop: 20,
  },
  termsText: {
    textAlign: "justify",
  },
  acceptButton: {
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
  },
});

interface ITermsOfServiceScreenProps {
  navigation: TermsOfServiceScreenProps["navigation"];
}

const TERMS_OF_SERVICE = `
The information you provide will be collected by QueueTime, Inc. for the purpose of collecting, consolidating and sharing live wait time estimates throughout the academic school year at McMaster University to provide a service for students to view wait times across campus. This information is collected under sections 20(b), 22(2)(a) & 27(2)(c) & 34(1)(a) of the Freedom of Information and Protection of Privacy Act (FOIP). 

Non-identifying information will be collected by QueueTime for the purpose of reporting total numbers of registered users. Contact information of individuals will be collected for the purpose of communicating prize details only. Information provided may be used by QueueTime for system management and planning, policy development and analysis of wait times on campus. Contact information will not be used for this purpose; only your random anonymized User ID and other de-identified data will be used. QueueTime enables you to exchange non-identifying information with other users via Bluetooth; other users will not have access to any of your individually identifying information.
`;
