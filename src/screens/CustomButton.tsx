import React, { ReactElement } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
interface Props {
  onPress: () => void;
  children: ReactElement;
  checkmark: boolean;
}

const CustomButton = ({ onPress, children, checkmark }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.customButton}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {children}
        {checkmark && (
          <Feather
            name="check"
            size={24}
            color="black"
            style={styles.checkmark}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButton: {
    width: 150,
    height: 50,
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default CustomButton;
