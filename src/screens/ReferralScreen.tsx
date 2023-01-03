import { useContext, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Button, View, WhiteSpace, InputItem } from "@ant-design/react-native";
import { StyledText } from "@components/StyledText";
import { ThemeContext } from "@contexts/theme";

export const ReferralScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [referralCode, setReferralCode] = useState("");

  const onInput = (value: string) => {
    console.log(value);
    setReferralCode(value);
  };

  const onNoReferralCodePress = () => {
    console.log("Next page");
  };

  return (
    <View style={[theme.styles.screenContainer, { paddingBottom: 35 }]}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("@assets/images/RewardBox.png")}
        />
        <WhiteSpace />
        <View style={{ width: "80%", height: 40 }}>
          <InputItem
            autoCapitalize="characters"
            textAlignVertical="center"
            textAlign="center"
            value={referralCode}
            placeholder="XCJ3HC"
            maxLength={6}
            onChange={onInput}
          />
        </View>
        <WhiteSpace size="xl" />
        <StyledText style={[theme.styles.primaryColor, styles.title]}>
          Have a referral code?
        </StyledText>
        <WhiteSpace size="sm" />
        <StyledText>Enter your referral code to earn bonus points!</StyledText>
        <WhiteSpace size="xl" />
        <TouchableOpacity onPress={onNoReferralCodePress}>
          <StyledText style={theme.styles.primaryColor}>
            I don't have one
          </StyledText>
        </TouchableOpacity>
      </View>

      {/* <Button type="primary">Submit</Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: 200,
    height: 200,
    marginBottom: 5,
  },
  title: {
    fontSize: 21,
    marginTop: 6,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
