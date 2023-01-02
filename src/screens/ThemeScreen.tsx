import { useContext } from "react";
import { StyleSheet } from "react-native";

import { WhiteSpace, View, Radio } from "@ant-design/react-native";

import { ThemeContext } from "@contexts/theme";
import { StyledText } from "@components/StyledText";

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
        <Radio.RadioItem value={"system"} left>
          <View style={styles.option}>
            <StyledText style={styles.optionText}>System</StyledText>
          </View>
        </Radio.RadioItem>
        <Radio.RadioItem value={"light"} left>
          <View style={styles.option}>
            <StyledText style={styles.optionText}>Light</StyledText>
          </View>
        </Radio.RadioItem>
        <Radio.RadioItem value={"dark"} left>
          <View style={styles.option}>
            <StyledText style={styles.optionText}>Dark</StyledText>
          </View>
        </Radio.RadioItem>
      </Radio.Group>
    </View>
  );
};

const styles = StyleSheet.create({
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
