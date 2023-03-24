import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "@contexts/auth";
import { poiApi } from "@api/client/apis";
import { displayError } from "@utils/error";
import { POIDetails } from "@api/generated/api";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DEFAULT_POI_DATA: POIDetails = {
  _id: "",
  address: "",
  class: "",
  distance: 0,
  estimate: 0,
  histogram: [],
  hoursOfOperation: {
    Friday: "~",
    Monday: "~",
    Saturday: "~",
    Sunday: "~",
    Thursday: "~",
    Tuesday: "~",
    Wednesday: "~",
  },
  imageUrl: "",
  lastUpdated: 0,
  location: { latitude: 0, longitude: 0 },
  name: "~",
  type: "~",
};

export const LocationDetailsScreen = ({
  route,
  navigation,
}: ILocationDetailsScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);
  const [showSubmittedSuccessModal, setSubmittedSuccessModal] = useState(false);
  const [showConfirmSuccessModal, setConfirmSuccessModal] = useState(false);
  const [newWaitTime, setNewWaitTime] = useState(0);
  const [wasInteracted, setWasInteracted] = useState(false);

  const [poiData, setPoiData] = useState<POIDetails>(DEFAULT_POI_DATA);
  const tickLabels = Array(poiData.histogram.length)
    .fill("")
    .map((label, i) => {
      // Return numbered labels for start, middle and end of list
      if (
        i == 0 ||
        i == poiData.histogram.length - 1 ||
        i == Math.floor(poiData.histogram.length / 2)
      ) {
        const suffix = poiData.histogram[i].time < 12 ? "am" : "pm";
        return `${poiData.histogram[i].time % 12}${suffix}`;
      }
      return label;
    });

  const fetchLocationDetails = async () => {
    try {
      const res = await poiApi.getPOIDetails(route.params.locationId, 70, 10, {
        headers: { Authorization: `Bearer ${await user!.getIdToken()}` },
      });
      setPoiData(res.data);
    } catch (error: any) {
      displayError(
        `Failed to fetch location details. ${
          error?.response?.data?.message || error
        }`
      );
    }
  };

  const sendWaitTimeEstimate = async (estimate: number) => {
    try {
      const payload = {
        wait_time_estimate: estimate,
      };
      await poiApi.submitUserEstimate(route.params.locationId, payload, {
        headers: { Authorization: `Bearer ${await user!.getIdToken()}` },
      });
    } catch (error: any) {
      displayError(
        `Failed to send location time estimate. ${
          error?.response?.data?.message || error
        }`
      );
    }
  };

  const submitNewWaitTime = () => {
    setSubmittedSuccessModal(true);
    sendWaitTimeEstimate(newWaitTime);
    setTimeout(() => {
      setSubmittedSuccessModal(false);
    }, 1500);
  };

  const confirmCurrentWaitTime = () => {
    setConfirmSuccessModal(true);
    sendWaitTimeEstimate(poiData.estimate);
    setTimeout(() => {
      setConfirmSuccessModal(false);
    }, 1500);
  };

  const refresh = async () => {
    setRefreshing(true);
    await fetchLocationDetails();
    setRefreshing(false);
  };

  // Refresh on load
  useEffect(() => {
    refresh();
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
        // tickValues specifies both the number of ticks and where they are placed on the axis
        tickValues={poiData.histogram.map(({ time }) => time)}
        tickFormat={tickLabels}
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
              datum.time === new Date().getHours() ? 1 : 0.5,
          },
        }}
        cornerRadius={{ top: 3, bottom: 3 }}
        data={poiData.histogram}
        x="time"
        y="estimate"
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
            onRefresh={refresh}
            progressBackgroundColor={theme.refreshIconBackgroundColorAndroid} // Android only: Background color of refresh icon
            tintColor={theme.iconColor}
          />
        }
      >
        {poiData.imageUrl && (
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={{
                uri: poiData.imageUrl,
              }}
            />
          </View>
        )}
        <View style={styles.addressContainer}>
          <StyledText style={styles.headingText}>
            {route.params.locationName}
          </StyledText>
          <StyledText style={styles.detailsText}>
            {`${poiData.address} • ${Math.round(poiData.distance)} m away`}
          </StyledText>
        </View>
        <View style={styles.divider} />
        <View>
          <StyledText style={styles.headingText}>Hours</StyledText>
          {DAYS_OF_WEEK.map((day: string) => (
            <StyledText key={day} style={styles.detailsText}>
              {`${day}: ${
                poiData.hoursOfOperation[
                  day as keyof typeof poiData.hoursOfOperation
                ]
              }`}
            </StyledText>
          ))}
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
            {`Current time is ${poiData.estimate} ${
              poiData.estimate === 1 ? `min` : `mins`
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
            onPress={confirmCurrentWaitTime}
            testID="confirmWaitTimeButton"
          >
            <StyledText
              style={[
                theme.styles.primaryColor,
                styles.confirnWaitTimeButtonText,
              ]}
            >
              {`Confirm ${poiData.estimate} ${
                poiData.estimate === 1 ? `min` : `mins`
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
    height: 150,
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
    paddingBottom: 10,
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
  route: LocationDetailsScreenProps["route"];
  navigation: LocationDetailsScreenProps["navigation"];
}
