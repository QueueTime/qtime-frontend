import { useContext } from "react";
import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableWithoutFeedback,
} from "react-native";

import { Modal, View } from "@ant-design/react-native";
import { StyledText } from "./StyledText";
import { ThemeContext } from "@contexts/theme";

/**
 * Success modal for displaying a success message after an operation completes.
 * Covers the entire screen. Allows option to close on tap or with a variable.
 *
 * Usage
 * ```js
 * const [showModal, setShowModal] = useState(true)
 *
 * <SuccessModal
 *   showModal={showModal}
 *   titleText="Congratulations"
 *   subtitleText="Thank you for your part of our community"
 *   onTapToClose={() => setShowModal(false)}
 *   imageSource={require("@assets/images/success.png")} />
 * ```
 */
export const SuccessModal = ({
  showModal,
  titleText,
  subtitleText,
  imageSource,
  onTapToClose,
  onClose,
}: ISuccessModalProps) => {
  const { theme } = useContext(ThemeContext);

  const modalVariableStyles = StyleSheet.create({
    container: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.styles.screenContainer.backgroundColor,
    },
  });

  return (
    <Modal
      transparent={false}
      visible={showModal}
      animationType="fade"
      onClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onTapToClose}>
        <View style={modalVariableStyles.container}>
          <Image style={styles.icon} source={imageSource} />
          <StyledText style={styles.title}>{titleText}</StyledText>
          <View style={styles.subtextContainer}>
            <StyledText style={[theme.styles.subText, styles.subtext]}>
              {subtitleText}
            </StyledText>
          </View>
          {onTapToClose && (
            <StyledText style={[theme.styles.primaryColor, styles.tapToClose]}>
              Tap anywhere to close
            </StyledText>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  icon: { marginBottom: 15, width: 40, height: 40 },
  title: {
    fontSize: 17,
    marginBottom: 4,
  },
  subtextContainer: {
    width: "80%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  subtext: {
    textAlign: "center",
    fontSize: 14,
  },
  tapToClose: {
    marginTop: 40,
    fontSize: 16,
  },
});

interface ISuccessModalProps {
  showModal: boolean;
  titleText: string;
  subtitleText?: string;
  imageSource: ImageSourcePropType;
  onTapToClose?: () => void;
  onClose?: () => void;
}
