import { useContext, useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { View, List } from "@ant-design/react-native";

import { AuthContext } from "@contexts/auth";
import { userApi } from "@api/client/apis";
import { ThemeContext } from "@contexts/theme";
import { StyledText } from "@components/StyledText";
import {
  ListRewardEvents200ResponseInner,
  ListRewardEvents200ResponseInnerSourceEnum,
} from "@api/generated";
import { displayError } from "@utils/error";

/**
 * Convert from system value of reward source to human readable string
 * @param source Reward source
 * @returns Equivalent human readable string
 */
const cleanRewardSource = (
  source: ListRewardEvents200ResponseInnerSourceEnum
): string => {
  switch (source) {
    case ListRewardEvents200ResponseInnerSourceEnum.ReferralBonus:
      return "Referral Bonus";
    case ListRewardEvents200ResponseInnerSourceEnum.ReferredBonus:
      return "Referred Bonus";
    case ListRewardEvents200ResponseInnerSourceEnum.WaittimeConfirm:
      return "Wait Time Confirm";
    case ListRewardEvents200ResponseInnerSourceEnum.WaittimeSubmit:
      return "Wait Time Submit";
    default:
      return "Reward Event";
  }
};

const HorizontalRule = () => <View style={styles.hr} />;

export const RewardsScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { user, userProfile } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);
  const [rewardsEvents, setRewardsEvents] = useState<
    ListRewardEvents200ResponseInner[]
  >([]);

  /**
   * Make an API call to fetch reward events associated with the user
   * @param before Timestamp to fetch events before, used when the end of the list is reached to append more events
   * @param limit Limit the number of events returned
   */
  const fetchRewardsEvents = async (before?: string, limit?: number) => {
    try {
      const res = await userApi.listRewardEvents(before, limit, {
        headers: { Authorization: `Bearer ${await user!.getIdToken()}` },
      });
      if (before) {
        setRewardsEvents(rewardsEvents.concat(res.data));
      } else {
        setRewardsEvents(res.data);
      }
    } catch (err: any) {
      displayError(
        `Failed to fetch reward events. ${err?.response?.data?.message || err}`
      );
    }
  };

  // Refresh the list of reward events
  const refresh = async () => {
    setRefreshing(true);
    await fetchRewardsEvents();
    setRefreshing(false);
  };

  /**
   * Fetch more reward events when the end of the list is reached
   */
  const fetchMoreEvents = async () => {
    if (rewardsEvents.length > 0) {
      const lastEvent = rewardsEvents[rewardsEvents.length - 1];
      await fetchRewardsEvents(lastEvent.timestamp);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <View style={[theme.styles.screenContainer, styles.container]}>
      <FlatList
        onRefresh={() => refresh()}
        refreshing={refreshing}
        onEndReached={() => fetchMoreEvents()}
        onEndReachedThreshold={0.4}
        data={rewardsEvents}
        keyExtractor={(item, index) =>
          `reward-${index}-${item.points}-source-${item.source}`
        }
        ListHeaderComponent={<HorizontalRule />}
        renderItem={({ item }) => (
          <List.Item
            thumb={
              <View>
                <AntDesign name="staro" size={22} color={theme.iconColor} />
              </View>
            }
            extra={
              <View>
                <List.Item.Brief style={styles.rewardItemBrief}>
                  <StyledText style={theme.styles.secondaryColor}>
                    {`+${item.points} points`}
                  </StyledText>
                </List.Item.Brief>
              </View>
            }
          >
            <View style={styles.rewardItem}>
              <StyledText style={[theme.styles.secondaryColor, styles.date]}>
                {new Date(item.timestamp).toDateString()}
              </StyledText>
              <StyledText style={[theme.styles.text, styles.rewardName]}>
                {cleanRewardSource(item.source)}
              </StyledText>
            </View>
          </List.Item>
        )}
      />
      <View style={styles.rewardPointsContainer}>
        <AntDesign
          name="star"
          size={24}
          color={theme.styles.primaryColor.color}
        />
        <StyledText
          style={[theme.styles.primaryText, styles.rewardsPointsText]}
          fontWeight="bold"
        >
          {`${userProfile?.rewardPointBalance || 0} points`}
        </StyledText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexDirection: "column",
  },
  date: {
    fontSize: 14,
  },
  rewardName: {
    fontSize: 16,
  },
  rewardItem: {
    paddingVertical: 8,
    marginLeft: 12,
  },
  rewardItemBrief: {
    textAlign: "right",
  },
  rewardPointsContainer: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  rewardsPointsText: {
    fontSize: 20,
    marginLeft: 8,
  },
  hr: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
