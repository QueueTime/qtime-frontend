import { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import {
  InputItem,
  TextareaItem,
  View,
  Button,
} from "@ant-design/react-native";

import { ThemeContext } from "@contexts/theme";
import { StyledText } from "@components/StyledText";
import { displayError } from "@utils/error";
import { SuccessModal } from "@components/SuccessModal";

export const POISuggestionScreen = () => {
  const { theme } = useContext(ThemeContext);

  const [nameInput, setNameInput] = useState("");
  const [addInfoInput, setAddInfoInput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitForm = () => {
    Keyboard.dismiss();
    if (nameInput.length === 0) {
      setHasError(true);
      return;
    }
    setShowSuccessModal(true);
    setNameInput("");
    setAddInfoInput("");
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[theme.styles.screenContainer]}>
        <ScrollView>
          <StyledText style={styles.infoText}>
            Feel like QTime is missing a location on campus? Submit your own
            location and it will go through our review process to be added in
            the app once complete!
          </StyledText>
          <View style={styles.inputsContainer}>
            <View style={styles.nameInputContainer}>
              <InputItem
                textAlign="left"
                placeholder="Location Name"
                placeholderTextColor={theme.styles.placeholderText.color}
                value={nameInput}
                onChangeText={(value) => {
                  setNameInput(value);
                  setHasError(false);
                }}
                maxLength={80}
                error={hasError}
                onErrorClick={() =>
                  displayError("Location name cannot be empty.")
                }
                name="locationName"
                type="text"
                testID="locationNameInputBox"
              />
            </View>
            <View style={styles.addInfoContainer}>
              <TextareaItem
                rows={4}
                value={addInfoInput}
                onChangeText={(value) => setAddInfoInput(value)}
                placeholder="Additional Information"
                placeholderTextColor={theme.styles.placeholderText.color}
                count={200}
                testID="additionalInfoInputBox"
              />
            </View>
          </View>
        </ScrollView>
        <Button type="primary" onPress={submitForm} testID="submitBtn">
          <StyledText>Submit</StyledText>
        </Button>
        <SuccessModal
          titleText="Location suggestion submitted!"
          subtitleText="Thank you for your contribution to the community!"
          imageSource={require("@assets/images/success.png")}
          showModal={showSuccessModal}
          onTapToClose={() => {
            setShowSuccessModal(false);
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  infoText: {
    textAlign: "justify",
  },
  inputsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  nameInputContainer: {
    marginTop: 15,
    marginBottom: 25,
  },
  addInfoContainer: {
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
