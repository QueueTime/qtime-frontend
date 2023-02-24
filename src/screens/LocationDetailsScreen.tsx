import { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  Alert,
} from "react-native";

import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import { Button } from "@ant-design/react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemeContext } from "@contexts/theme";
import { StyledText } from "@components/StyledText";
import { SuccessModal } from "@components/SuccessModal";
import { renderLastUpdated } from "@utils/time";
import { LocationDetailsScreenProps } from "@navigators/WaitTimeStackNavigator";

export const LocationDetailsScreen = ({
  navigation,
}: ILocationDetailsScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [showSubmittedSuccessModal, setSubmittedSuccessModal] = useState(false);
  const [showConfirmSuccessModal, setConfirmSuccessModal] = useState(false);
  const [newWaitTime, setNewWaitTime] = useState(0);
  const [wasInteracted, setWasInteracted] = useState(false);

  const chartData = [
    { hour: 7, waitTime: 1 },
    { hour: 8, waitTime: 2 },
    { hour: 9, waitTime: 1 },
    { hour: 10, waitTime: 4 },
    { hour: 11, waitTime: 6 },
    { hour: 12, waitTime: 15 },
    { hour: 13, waitTime: 6 },
    { hour: 14, waitTime: 4 },
    { hour: 15, waitTime: 5 },
    { hour: 16, waitTime: 5 },
    { hour: 17, waitTime: 7 },
    { hour: 18, waitTime: 3 },
    { hour: 19, waitTime: 15 },
    { hour: 20, waitTime: 3 },
    { hour: 21, waitTime: 2 },
    { hour: 22, waitTime: 5 },
    { hour: 23, waitTime: 1 },
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

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        const action = e.data.action;
        if (!wasInteracted) {
          return;
        }

        e.preventDefault();

        Alert.alert(
          "You're so close!",
          "You can earn points to win free rewards by submitting your wait time.",
          [
            { text: "Cancel", style: "cancel", onPress: () => {} },
            {
              text: "Abandon Time Submission",
              style: "destructive",
              onPress: () => navigation.dispatch(action),
            },
          ]
        );
      }),
    [wasInteracted, navigation]
  );

  const popularTimeChart = (
    <VictoryChart height={175}>
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
              datum.hour === new Date().getHours() ? 1 : 0.5,
          },
        }}
        cornerRadius={{ top: 3, bottom: 3 }}
        data={chartData}
        x="hour"
        y="waitTime"
        barWidth={15}
      />
    </VictoryChart>
  );

  return (
    <View style={[theme.styles.screenContainer, styles.noTopPadding]}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
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
          <Image
            style={styles.img}
            source={require("@assets/images/centro.png")}
          />
        </View>
        <View style={styles.addressContainer}>
          <StyledText style={styles.headingText}>{poiData.name}</StyledText>
          <StyledText style={styles.detailsText}>
            {`${poiData.address} • ${poiData.distance} km away`}
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
        <View style={styles.chartContainer}>{popularTimeChart}</View>
      </ScrollView>
      <View style={styles.waitTimeContainer}>
        <View>
          <StyledText style={styles.waitTimeText}>Wait Time</StyledText>
          <StyledText style={styles.detailsText}>
            {`Current time is ${poiData.waitTime} ${
              poiData.waitTime === 1 ? `min` : `mins`
            } • ${renderLastUpdated(poiData.lastUpdated)}`}
          </StyledText>
        </View>
        <View style={styles.confirmWaitTimeButtonContainer}>
          <Button
            type="ghost"
            style={[
              theme.styles.confirmWaitTimeButton,
              styles.waitTimeButtonHeight,
            ]}
            onPress={confirmNewWaitTime}
            testID="confirmWaitTimeButton"
          >
            <StyledText
              style={[
                theme.styles.primaryColor,
                styles.confirnWaitTimeButtonText,
              ]}
            >
              {`Confirm ${poiData.waitTime} ${
                poiData.waitTime === 1 ? `min` : `mins`
              }`}
            </StyledText>
          </Button>
        </View>
        <View style={styles.newWaitTimeContainer}>
          <View style={styles.newWaitTimeButtonsContainer}>
            <Button
              size="large"
              style={[
                theme.styles.newWaitTimePlusMinusButton,
                styles.waitTimeButtonHeight,
                styles.newWaitTimePlusMinusButton,
                styles.newWaitTimeMinusButton,
              ]}
              disabled={newWaitTime === 0}
              onPress={() => {
                setNewWaitTime((prevCount) => prevCount - 1);
                setWasInteracted(true);
              }}
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
                {`${newWaitTime} ${newWaitTime === 1 ? `min` : `mins`}`}
              </StyledText>
            </View>
            <Button
              size="large"
              style={[
                theme.styles.newWaitTimePlusMinusButton,
                styles.waitTimeButtonHeight,
                styles.newWaitTimePlusMinusButton,
                styles.newWaitTimePlusButton,
              ]}
              disabled={newWaitTime >= 60}
              onPress={() => {
                setNewWaitTime((prevCount) => prevCount + 1);
                setWasInteracted(true);
              }}
              testID="waitTimePlusButton"
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
              style={styles.waitTimeButtonHeight}
              onPress={submitNewWaitTime}
              testID="submitWaitTimeButton"
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
  noTopPadding: {
    paddingTop: 0,
  },
  scrollContainer: {
    flexDirection: "column",
    paddingTop: 20,
  },
  imgContainer: {
    alignItems: "center",
  },
  img: {
    borderRadius: 6,
    width: "100%",
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
  waitTimeButtonHeight: {
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
    width: 65,
  },
  newWaitTimeText: {
    fontSize: 13,
    alignText: "center",
  },
  submitNewWaitTimeContainer: {
    flex: 2,
  },
  submitNewWaitTimeText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  divider: {
    marginTop: 25,
    marginBottom: 20,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
  },
});

interface ILocationDetailsScreenProps {
  navigation: LocationDetailsScreenProps["navigation"];
}
