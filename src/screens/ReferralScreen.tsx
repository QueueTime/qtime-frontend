import { useContext, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

import { View, WhiteSpace, InputItem } from "@ant-design/react-native";
import ConfettiCannon from "react-native-confetti-cannon";

import { StyledText } from "@components/StyledText";
import { ThemeContext } from "@contexts/theme";
import { AuthContext } from "@contexts/auth";
import { completeUserOnboarding } from "@utils/firestore";
import { displayError } from "@utils/error";

const MAX_CHARS = 6;
const PLACEHOLDER = "XCJDHC";
const CODE = "ABCDEF";

export const ReferralScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { userProfile } = useContext(AuthContext);

  const [userInput, setUserInput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const confettiColors = ["#1677ff", "#5c5c5c", "#16adff"];

  const inputStyles = StyleSheet.create({
    input: {
      color: hasError ? "red" : theme.styles.text.color,
      flex: 1,
      textAlign: "center",
      // Workaround on Android to ensure cursor stays centered when all input is removed
      // https://github.com/facebook/react-native/issues/27658
      width: userInput ? "100%" : "95%",
    },
  });

  const onSubmit = () => {
    if (isTransitioning) {
      return; // Prevent multiple submissions once one is validated
    }

    if (userInput.length < MAX_CHARS) {
      setHasError(true);
      setErrorCode(`Code must be ${MAX_CHARS} characters long.`);
      return;
    }

    // TODO: Replace this with a call to check if the code is valid
    if (userInput !== CODE) {
      setHasError(true);
      setErrorCode("Invalid referral code. Try again.");
      return;
    }

    setIsTransitioning(true);
    // TODO: Add code to attribute points
    setTimeout(() => {
      setIsTransitioning(false);
      completeOnboarding();
    }, 3000);
  };

  const onInput = (value: string) => {
    setUserInput(value);
    setHasError(false);
  };

  const completeOnboarding = async () => {
    try {
      await completeUserOnboarding(userProfile!.email);
    } catch (error) {
      displayError(
        `Failed to complete referral step. Try again later. ${error}`
      );
    }
  };

  return (
    <View style={[theme.styles.screenContainer, styles.container]}>
      <Image
        style={styles.image}
        source={require("@assets/images/RewardBox.png")}
      />
      <WhiteSpace />
      <View style={styles.inputContainer}>
        <InputItem
          styles={{
            // Required to ensure text in input is centered on Android
            container: {
              flex: 1,
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            },
          }}
          style={inputStyles.input}
          autoCapitalize="characters"
          textAlignVertical="center"
          textAlign="center"
          value={userInput}
          placeholder={PLACEHOLDER}
          placeholderTextColor={theme.styles.text.color}
          cursorColor={theme.styles.text.color}
          maxLength={MAX_CHARS}
          onChangeText={(value) => onInput(value)}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
          testID="referral-input-textbox"
          name="referral"
          type="text"
        />
      </View>
      <View style={styles.errorWrapper}>
        {hasError && (
          <StyledText style={styles.errorText}>{errorCode}</StyledText>
        )}
      </View>
      <StyledText
        fontWeight="bold"
        style={[theme.styles.primaryColor, styles.title]}
      >
        Have a referral code?
      </StyledText>
      <WhiteSpace size="sm" />
      <StyledText>Enter your referral code to earn bonus points!</StyledText>
      <WhiteSpace size="xl" />
      <TouchableOpacity disabled={isTransitioning} onPress={completeOnboarding}>
        <StyledText style={theme.styles.primaryColor}>
          I don't have one
        </StyledText>
      </TouchableOpacity>
      {isTransitioning && (
        <ConfettiCannon
          count={80}
          origin={{ x: Dimensions.get("window").width / 2, y: -15 }}
          fadeOut
          colors={confettiColors}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    width: 200,
    height: 200,
    marginBottom: 5,
  },
  inputContainer: { width: "80%", height: 40 },
  title: {
    fontSize: 21,
    marginTop: 6,
  },
  errorWrapper: {
    marginTop: 4,
    height: 20,
  },
  errorText: {
    color: "red",
  },
});
