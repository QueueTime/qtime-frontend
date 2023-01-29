import { useCallback, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";

import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import { Button } from "@ant-design/react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemeContext } from "@contexts/theme";
import { StyledText } from "@components/StyledText";
import { SuccessModal } from "@components/SuccessModal";
import { renderLastUpdated } from "@utils/waitTime";

export const LocationDetailsScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [showSubmittedSuccessModal, setSubmittedSuccessModal] = useState(false);
  const [showConfirmSuccessModal, setConfirmSuccessModal] = useState(false);
  const [newWaitTime, setNewWaitTime] = useState(0);

  const chartData = [
    { quarter: 7, earnings: 1 },
    { quarter: 8, earnings: 2 },
    { quarter: 9, earnings: 1 },
    { quarter: 10, earnings: 4 },
    { quarter: 11, earnings: 6 },
    { quarter: 12, earnings: 15 },
    { quarter: 13, earnings: 6 },
    { quarter: 14, earnings: 4 },
    { quarter: 15, earnings: 5 },
    { quarter: 16, earnings: 5 },
    { quarter: 17, earnings: 7 },
    { quarter: 18, earnings: 3 },
    { quarter: 19, earnings: 15 },
    { quarter: 20, earnings: 3 },
    { quarter: 21, earnings: 2 },
    { quarter: 22, earnings: 5 },
    { quarter: 23, earnings: 1 },
  ];

  const poiData = {
    name: "Centro",
    address: "Commons Building",
    distance: 2.1,
    hours: [
      { "Monday - Friday": "7:00 AM - 11:00 PM" },
      { "Saturday & Sunday": "10:00 AM - 11:00 PM" },
    ],
    lastUpdated: 4,
    waitTime: 10,
    currentHour: 14,
  };

  const submitNewWaitTime = () => {
    // send new wait time to backend
    // api call with newWaitTime
    setSubmittedSuccessModal(true);
    setTimeout(() => {
      setSubmittedSuccessModal(false);
    }, 2000);
  };

  const confirmNewWaitTime = () => {
    // send wait time to backend
    setConfirmSuccessModal(true);
    setTimeout(() => {
      setConfirmSuccessModal(false);
    }, 2000);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={theme.styles.screenContainer}>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={theme.refreshIconBackgroundColorAndroid} // Android only: Background color of refresh icon
            tintColor={theme.iconColor}
          />
        }
      >
        <View style={styles.imgContainer}>
          {/* TODO
              Add height and width once we know a sample image from the backend
              And change source */}
          <Image
            style={styles.img}
            source={require("@assets/images/centro.png")}
          />
        </View>
        <View style={styles.addressContainer}>
          <StyledText style={styles.headingText}>{poiData.name}</StyledText>
          <StyledText style={styles.detailsText}>
            {poiData.address + " • " + poiData.distance + " km away"}
          </StyledText>
        </View>
        <View style={styles.divider} />
        <View>
          <StyledText style={styles.headingText}>Hours</StyledText>
          {poiData.hours.map((day) => {
            return (
              <StyledText key={Object.keys(day)[0]} style={styles.detailsText}>
                {Object.keys(day) + ", " + Object.values(day)}
              </StyledText>
            );
          })}
        </View>
        <View style={styles.divider} />
        <View>
          <StyledText style={styles.headingText}>Popular Times</StyledText>
        </View>
        <View style={styles.chartContainer}>
          <VictoryChart width={420} height={175}>
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              // TODO: Will need to change this to be dynamic based on the hours of operation
              tickValues={[
                7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
              ]}
              tickFormat={[
                "7am",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "3pm",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "11pm",
              ]}
              style={{
                tickLabels: { fill: theme.styles.placeholderText.color },
                axis: { stroke: "none" },
              }}
            />
            <VictoryBar
              style={{
                data: {
                  fill: "#1677FF",
                  opacity: ({ datum }) =>
                    datum.quarter === poiData.currentHour ? 1 : 0.5,
                },
              }}
              cornerRadius={{ top: 3, bottom: 3 }}
              data={chartData}
              x="quarter"
              y="earnings"
            />
          </VictoryChart>
        </View>
      </ScrollView>
      <View style={styles.waitTimeContainer}>
        <View>
          <StyledText style={styles.waitTimeText}>Wait Time</StyledText>
          <StyledText style={styles.detailsText}>
            {"Current time is " +
              poiData.waitTime +
              (poiData.waitTime === 1 ? " min" : " mins") +
              " • " +
              renderLastUpdated(poiData.lastUpdated)}
          </StyledText>
        </View>
        <View style={styles.confirmWaitTimeButtonContainer}>
          <Button
            style={[theme.styles.confirmWaitTimeButton, styles.waitTimeButtons]}
            onPress={confirmNewWaitTime}
          >
            <StyledText
              style={[
                theme.styles.primaryColor,
                styles.confirnWaitTimeButtonText,
              ]}
            >
              {"Confirm " +
                poiData.waitTime +
                (poiData.waitTime === 1 ? " min" : " mins")}
            </StyledText>
          </Button>
        </View>
        <View style={styles.newWaitTimeContainer}>
          <View style={styles.newWaitTimeButtonsContainer}>
            <Button
              size="large"
              style={[
                theme.styles.newWaitTimePlusMinusButton,
                styles.waitTimeButtons,
                styles.newWaitTimePlusMinusButton,
                styles.newWaitTimeMinusButton,
              ]}
              disabled={newWaitTime === 0}
              onPress={() => setNewWaitTime((prevCount) => prevCount - 1)}
            >
              <AntDesign
                name="minus"
                size={18}
                color={theme.styles.primaryColor.color}
              />
            </Button>
            <View
              style={[
                theme.styles.newWaitTimeTextContainer,
                styles.newWaitTimeTextContainer,
              ]}
            >
              <StyledText style={[theme.styles.text, styles.newWaitTimeText]}>
                {newWaitTime + (newWaitTime === 1 ? " min" : " mins")}
              </StyledText>
            </View>
            <Button
              size="large"
              style={[
                theme.styles.newWaitTimePlusMinusButton,
                styles.waitTimeButtons,
                styles.newWaitTimePlusMinusButton,
                styles.newWaitTimePlusButton,
              ]}
              disabled={newWaitTime >= 60}
              onPress={() => setNewWaitTime((prevCount) => prevCount + 1)}
            >
              <AntDesign
                name="plus"
                size={18}
                color={theme.styles.primaryColor.color}
              />
            </Button>
          </View>
          <View style={styles.submitNewWaitTimeContainer}>
            <Button
              type="primary"
              style={styles.waitTimeButtons}
              onPress={submitNewWaitTime}
            >
              <StyledText style={styles.submitNewWaitTimeText}>
                Submit New Time
              </StyledText>
            </Button>
          </View>
        </View>
      </View>
      <SuccessModal
        showModal={showSubmittedSuccessModal}
        titleText="Wait Time Submitted!"
        subtitleText="Thank you for your contribution to our community!"
        imageSource={require("@assets/images/WaitTime.png")}
      />
      <SuccessModal
        showModal={showConfirmSuccessModal}
        titleText="Wait Time Confirmed!"
        subtitleText="Thank you for your contribution to our community!"
        imageSource={require("@assets/images/success.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  huge: {
    fontSize: 20,
  },
  scrollContainer: {
    flexDirection: "column",
  },
  imgContainer: {
    alignItems: "center",
  },
  img: {
    borderRadius: 6,
  },
  addressContainer: {
    marginTop: 35,
  },
  detailsText: {
    fontSize: 13,
    marginTop: 5,
    color: "#999999",
  },
  headingText: {
    fontSize: 17,
  },
  chartContainer: {
    alignItems: "center",
  },
  waitTimeContainer: {
    borderTopColor: "#EEEEEE",
    borderTopWidth: 1,
  },
  waitTimeText: {
    fontSize: 17,
    paddingTop: 10,
  },
  confirmWaitTimeButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  waitTimeButtons: {
    height: 30,
  },
  confirnWaitTimeButtonText: {
    fontSize: 12,
  },
  newWaitTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  newWaitTimeButtonsContainer: {
    flex: 2,
    flexDirection: "row",
  },
  newWaitTimePlusMinusButton: {
    borderWidth: 1,
    borderRadius: 2,
  },
  newWaitTimeMinusButton: {
    marginRight: 4,
  },
  newWaitTimePlusButton: {
    marginLeft: 4,
  },
  newWaitTimeTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  newWaitTimeText: {
    fontSize: 13,
    alignText: "center",
  },
  submitNewWaitTimeContainer: {
    flex: 2,
  },
  submitNewWaitTimeText: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  divider: {
    marginTop: 25,
    marginBottom: 20,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
  },
});
