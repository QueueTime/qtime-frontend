import { useContext } from "react";
import { StyleSheet } from "react-native";

import { WhiteSpace, View, Radio } from "@ant-design/react-native";

import { ThemeContext } from "@contexts/theme";
import { StyledText } from "@components/StyledText";
import { THEME_NAMES } from "@constants/theme";

// Sub-component for displaying the radio item option
const RadioOption = ({ text, value }: IRadioOptionProps) => (
  <Radio.RadioItem
    listItemStyles={{
      Line: { borderBottomWidth: 0 }, // Remove bottom lines under each option
    }}
    style={styles.radio}
    value={value}
    left
  >
    <View style={styles.option}>
      <StyledText style={styles.optionText}>{text}</StyledText>
    </View>
  </Radio.RadioItem>
);

export const ThemeScreen = () => {
  const { theme, themePreference, changeTheme } = useContext(ThemeContext);

  return (
    <View style={[theme.styles.screenContainer]}>
      <StyledText>
        Customize the app experience by choosing a theme preference:
      </StyledText>
      <WhiteSpace />

      <Radio.Group
        onChange={(e: any) => changeTheme(e.target.value)}
        value={themePreference}
      >
        <RadioOption text="System" value={THEME_NAMES.system} />
        <RadioOption text="Light" value={THEME_NAMES.light} />
        <RadioOption text="Dark" value={THEME_NAMES.dark} />
      </Radio.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    paddingVertical: 5,
  },
  option: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: -4,
  },
  optionText: {
    fontSize: 16,
  },
});

interface IRadioOptionProps {
  text: string;
  value: string;
}
