import { useCallback, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

import { AntDesign } from "@expo/vector-icons";

import { ThemeContext } from "@contexts/theme";
import { StyledText } from "@components/StyledText";
import { Button } from "@ant-design/react-native";

export const LocationDetailsScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={theme.styles.screenContainer}>
      <ScrollView
        style={{ flexDirection: "column" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={theme.refreshIconBackgroundColorAndroid} // Android only: Background color of refresh icon
            tintColor={theme.iconColor}
          />
        }
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ borderRadius: 6 }}
            source={require("@assets/images/centro.png")}
          />
        </View>
        <View style={{ paddingTop: 35 }}>
          <StyledText style={{ fontSize: 17 }}>Location</StyledText>
          <StyledText style={{ fontSize: 13, paddingTop: 5, color: "#999999" }}>
            Commons Building • 0.1 km away
          </StyledText>
        </View>
        <View style={styles.stepScrollDivider} />
        <View style={{ paddingTop: 20 }}>
          <StyledText style={{ fontSize: 17 }}>Hours</StyledText>
          <StyledText style={{ fontSize: 13, paddingTop: 5, color: "#999999" }}>
            Monday - Friday, 7:00 AM - 11:00 PM
          </StyledText>
          <StyledText style={{ fontSize: 13, paddingTop: 3, color: "#999999" }}>
            Saturday & Sunday, 10:00 AM - 11:00 PM
          </StyledText>
        </View>
        <View style={styles.stepScrollDivider} />
        <View style={{ paddingTop: 20 }}>
          <StyledText style={{ fontSize: 17 }}>Popular Times</StyledText>
        </View>
        <View>
          {/* <VictoryBar
            style={{ data: { fill: "#1677FF", opacity: 0.5 } }}
            data={data}
            x="quarter"
            y="earnings"
          /> */}
        </View>
      </ScrollView>
      <View style={{ borderTopColor: "#EEEEEE", borderTopWidth: 1 }}>
        <View>
          <StyledText style={{ fontSize: 17, paddingTop: 10 }}>
            Wait Time
          </StyledText>
          <StyledText style={{ fontSize: 13, paddingTop: 5, color: "#999999" }}>
            Current time is 10 mins • Last updated 4 mins ago
          </StyledText>
        </View>
        <View style={{ paddingTop: 20 }}>
          <Button
            style={{
              borderColor: theme.styles.primaryColor.color,
              height: 28,
            }}
          >
            <StyledText
              style={{ fontSize: 12, color: theme.styles.primaryColor.color }}
            >
              Confirm 10 mins
            </StyledText>
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#F5F5F5",
                  borderWidth: 0,
                  marginRight: 3,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={theme.styles.primaryColor.color}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#F5F5F5",
              }}
            >
              <StyledText style={{ fontSize: 13 }}>0 mins</StyledText>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#F5F5F5",
                  borderWidth: 0,
                  marginLeft: 3,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color={theme.styles.primaryColor.color}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            style={{
              borderColor: theme.styles.primaryColor.color,
              height: 28,
              width: "65%",
              backgroundColor: theme.styles.primaryColor.color,
            }}
          >
            <StyledText style={{ fontSize: 12, color: "#FFFFFF" }}>
              Submit New Time
            </StyledText>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  huge: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  stepScrollDivider: {
    paddingTop: 25,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
  },
});
