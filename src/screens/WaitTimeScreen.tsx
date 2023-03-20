import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from "react-native";

import {
  Button,
  SearchBar,
  Tag,
  Modal,
  Steps,
  List,
} from "@ant-design/react-native";
import {
  Feather,
  MaterialIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { StyledText } from "@components/StyledText";
import { LOCATION_DETAILS } from "@constants/routes";
import { WaitTimeScreenProps } from "@navigators/WaitTimeStackNavigator";
import { ThemeContext } from "@contexts/theme";
import { renderLastUpdated } from "@utils/time";
import { poiApi } from "@api/client/apis";
import { displayError } from "@utils/error";
import { AuthContext } from "@contexts/auth";
import { GetAllPOI200ResponseInner } from "@api/generated/api";

type POI = GetAllPOI200ResponseInner;

enum SortByEnum {
  DISTANCE = "Distance",
  TIME = "Time",
}

enum POIType {
  EATERY = "EATERY",
  SHOP = "SHOP",
  TRANSPORT = "TRANSPORT",
  LIBRARY = "LIBRARY",
  GYM = "GYM",
}

// Default values for the aggregate wait time estimates
const DEFAULT_AGGREGATE_DATA = {
  lowest: Infinity,
  average: 0,
  highest: -1,
};

/**
 * Render an icon based on the type of a POI
 */
function renderIcon(type: POIType, theme: string): JSX.Element {
  switch (type) {
    case POIType.EATERY:
      return <MaterialIcons name={"restaurant"} size={24} color={theme} />;
    case POIType.SHOP:
      return <AntDesign name="shoppingcart" size={24} color={theme} />;
    case POIType.TRANSPORT:
      return <Ionicons name="bus-outline" size={24} color={theme} />;
    case POIType.LIBRARY:
      return <MaterialCommunityIcons name="library" size={24} color={theme} />;
    case POIType.GYM:
      return (
        <MaterialCommunityIcons name="weight-lifter" size={24} color={theme} />
      );
    default: // generic map pin icon if unrecognized type
      return <Feather name={"map-pin"} size={24} color={theme} />;
  }
}

export const WaitTimeScreen = ({ navigation }: IWaitTimeScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [searchValue, setSearchValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState(SortByEnum.DISTANCE);
  const [refreshing, setRefreshing] = useState(false);
  const [rawPOIData, setRawPOIData] = useState<POI[]>([]);
  const [poiFilters, setPOIFilters] = useState<Set<POIType>>(new Set());
  const [aggregateData, setAggregateData] = useState(DEFAULT_AGGREGATE_DATA);

  let searchBar: SearchBar | null;

  const filters = [
    { display: "Food", val: POIType.EATERY },
    { display: "Shop", val: POIType.SHOP },
    { display: "Transport", val: POIType.TRANSPORT },
    { display: "Gym", val: POIType.GYM },
    { display: "Library", val: POIType.LIBRARY },
  ];

  const poiData = rawPOIData.filter((poi) => {
    // Filter by search
    return (
      // No search or type filters
      (searchValue.length === 0 && poiFilters.size === 0) ||
      // Filter by search
      (searchValue.length > 0 &&
        poi.name.toLowerCase().includes(searchValue.toLowerCase())) ||
      // Filter by type
      (poiFilters.size > 0 && poiFilters.has(POIType[poi.type as POIType]))
    );
  });

  /**
   * Fetch POIs from the API
   */
  const fetchPOIs = async () => {
    try {
      const res = await poiApi.getAllPOI(
        43.262983, // TODO: replace with user's LATITUDE
        -79.918611, // TODO: replace with user's LONGITUDE
        "queue",
        sortBy === SortByEnum.DISTANCE ? "distance" : "estimate",
        {
          headers: { Authorization: `Bearer ${await user!.getIdToken()}` },
        }
      );
      setRawPOIData(res.data);
    } catch (err: any) {
      displayError(
        `Failed to fetch locations. ${err?.response?.data?.message || err}`
      );
    }
  };

  // Refresh on first load
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute and update aggregate data (averages, lowest, highest, etc.)
  useEffect(() => {
    let lowest = DEFAULT_AGGREGATE_DATA.lowest;
    let average = DEFAULT_AGGREGATE_DATA.average;
    let highest = DEFAULT_AGGREGATE_DATA.highest;
    for (const poi of poiData) {
      lowest = Math.min(lowest, poi.estimate);
      highest = Math.max(highest, poi.estimate);
      average += poi.estimate;
    }
    setAggregateData({ lowest, average, highest });
  }, [JSON.stringify(poiData)]); // This prevents multiple tiggers that can happen with an array

  const refresh = async () => {
    setRefreshing(true);
    await fetchPOIs();
    setRefreshing(false);
  };

  const modalComponent = (
    <Modal
      transparent={false}
      visible={isVisible}
      animationType="slide-up"
      popup
      style={styles.modal}
    >
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View
              style={[styles.modalHeader, theme.styles.waitTimeModalHeader]}
            >
              <View style={styles.modalActionRow}>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);
                  }}
                >
                  <StyledText style={styles.modalButtons}>Cancel</StyledText>
                </TouchableOpacity>
                <StyledText>Sort By</StyledText>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);
                  }}
                >
                  <StyledText style={styles.modalButtons}>Done</StyledText>
                </TouchableOpacity>
              </View>
              <View>
                <Button
                  style={[
                    styles.sortButtons,
                    theme.styles.waitTimeModalSortButtons,
                  ]}
                  onPress={() => {
                    setSortBy(SortByEnum.TIME);
                    refresh();
                    setIsVisible(false);
                  }}
                >
                  <StyledText>Time</StyledText>
                  <View style={styles.checkIconTime}>
                    {sortBy === "Time" && (
                      <Feather name="check" size={24} color={theme.iconColor} />
                    )}
                  </View>
                </Button>
                <Button
                  style={[
                    styles.sortButtons,
                    theme.styles.waitTimeModalSortButtons,
                  ]}
                  onPress={() => {
                    setSortBy(SortByEnum.DISTANCE);
                    refresh();
                    setIsVisible(false);
                  }}
                >
                  <StyledText>Distance</StyledText>
                  <View style={styles.checkIconDistance}>
                    {sortBy === "Distance" && (
                      <Feather name="check" size={24} color={theme.iconColor} />
                    )}
                  </View>
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        searchBar?.inputRef?.blur();
      }}
    >
      <View style={[theme.styles.screenContainer, styles.container]}>
        <View style={styles.searchContainer}>
          <SearchBar
            ref={(el) => ((searchBar as any) = el)}
            placeholderTextColor={theme.styles.placeholderText.color}
            style={[styles.searchBar, theme.styles.waitTimeSearchBar]}
            value={searchValue}
            placeholder="Search places"
            onChange={(value) => {
              setSearchValue(value);
            }}
            onSubmit={(value) => {
              setSearchValue(value);
            }}
            cancelText={"Cancel"}
            onCancel={() => {
              searchBar?.inputRef?.blur();
            }}
          />
        </View>
        <View style={styles.sortContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Button
              style={styles.sortByTag}
              onPress={() => {
                setIsVisible(true);
              }}
            >
              <StyledText style={styles.sortByText}>Sort By</StyledText>
            </Button>
            {filters.map(({ display, val }) => {
              return (
                <Tag
                  key={display}
                  style={styles.tags}
                  styles={StylesOverride.tagStyles}
                  onChange={(selected) => {
                    if (selected) {
                      setPOIFilters(new Set(poiFilters).add(val));
                    } else {
                      const next = new Set(poiFilters);
                      next.delete(val);
                      setPOIFilters(next);
                    }
                  }}
                >
                  {display}
                </Tag>
              );
            })}
          </ScrollView>
        </View>
        {modalComponent}
        <View style={styles.stepsContainer}>
          <Steps
            styles={StylesOverride.stepsStyles}
            size="small"
            direction="horizontal"
          >
            <Steps.Step key={"lowest"} status={"wait"} />
            <Steps.Step key={"average"} status={"wait"} />
            <Steps.Step key={"highest"} status={"wait"} />
          </Steps>
        </View>
        <View style={styles.stepTextContainer}>
          <View style={styles.stepTextView} key={"Lowest"}>
            <StyledText style={styles.stepTitleText}>
              {poiData.length > 0 ? aggregateData.lowest + " mins" : "~ mins"}
            </StyledText>
            <StyledText style={styles.stepDescriptionText}>Lowest</StyledText>
          </View>
          <View style={styles.stepTextView} key={"Average"}>
            <StyledText style={styles.stepTitleText}>
              {poiData.length > 0
                ? Math.round(aggregateData.average / poiData.length) + " mins"
                : "~ mins"}
            </StyledText>
            <StyledText style={styles.stepDescriptionText}>Average</StyledText>
          </View>
          <View style={styles.stepTextView} key={"Highest"}>
            <StyledText style={styles.stepTitleText}>
              {poiData.length > 0 ? aggregateData.highest + " mins" : "~ mins"}
            </StyledText>
            <StyledText style={styles.stepDescriptionText}>Highest</StyledText>
          </View>
        </View>
        <View style={styles.stepScrollDivider} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              progressBackgroundColor={theme.refreshIconBackgroundColorAndroid} // Android only: Background color of refresh icon
              tintColor={theme.iconColor}
            />
          }
        >
          <List>
            {poiData.map((poi: POI) => (
              <List.Item
                key={poi._id}
                onPress={() => {
                  navigation.navigate(LOCATION_DETAILS, {
                    location: poi._id,
                  });
                }}
                extra={
                  <View>
                    <List.Item.Brief style={styles.poiWaitTimeText}>
                      {poi.estimate + (poi.estimate === 1 ? " min" : " mins")}
                    </List.Item.Brief>
                  </View>
                }
                arrow="horizontal"
                thumb={
                  <View style={styles.poiIcon}>
                    {renderIcon(poi.type as POIType, theme.iconColor)}
                  </View>
                }
                style={styles.poiItem}
              >
                <StyledText style={styles.poiDistanceText}>
                  {Math.round(poi.distance) + " m"}
                </StyledText>
                <StyledText>{poi.name}</StyledText>
                <StyledText style={styles.poiLastUpdatedText}>
                  {renderLastUpdated(poi.lastUpdated)}
                </StyledText>
              </List.Item>
            ))}
          </List>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  searchContainer: {
    marginTop: Platform.OS === "ios" ? 35 : 0,
    paddingHorizontal: 20,
  },
  searchBar: {
    borderRadius: 6,
  },
  sortContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tags: {
    paddingRight: 6,
  },
  sortByTag: {
    borderRadius: 24,
    height: 34,
    marginRight: 6,
    borderWidth: 0.5,
  },
  sortByText: {
    fontSize: 15,
    textAlign: "center",
  },
  modal: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0)",
  },
  modalBackground: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
  },
  modalButtons: {
    color: "#1677FF",
  },
  modalHeader: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  sortButtons: {
    alignItems: "flex-start",
  },
  checkIconTime: {
    paddingLeft: "85%",
  },
  checkIconDistance: {
    paddingLeft: "76%",
  },
  stepsContainer: {
    marginTop: 35,
    alignItems: "center",
    height: 20,
  },
  stepTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepTextView: {
    flex: 1,
  },
  stepTitleText: {
    textAlign: "center",
  },
  stepDescriptionText: {
    textAlign: "center",
    color: "#999999",
  },
  stepScrollDivider: {
    paddingTop: 30,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 0.5,
  },
  poiItem: {
    paddingLeft: 25,
  },
  poiWaitTimeText: {
    textAlign: "right",
    color: "#999999",
  },
  poiIcon: {
    paddingRight: 15,
    marginLeft: -10,
  },
  poiDistanceText: {
    fontSize: 13,
    color: "#999999",
    paddingTop: 10,
    paddingBottom: 5,
  },
  poiLastUpdatedText: {
    fontSize: 13,
    color: "#999999",
    paddingTop: 5,
    paddingBottom: 10,
  },
});

const StylesOverride = {
  tagStyles: {
    activeWrap: {
      backgroundColor: "#1677FF",
    },
    activeText: {
      color: "#F5F5F5",
    },
  },
  stepsStyles: {
    tail_last: {
      width: 0,
    },
    head_default_s: {
      width: 10,
      height: 10,
      backgroundColor: "#EEEEEE",
      borderWidth: 0,
    },
    tail_blue: {
      backgroundColor: "#EEEEEE",
    },
    tail_gray: {
      backgroundColor: "#EEEEEE",
    },
    tail_default_s_h: {
      marginTop: 4,
      height: 1.5,
      width: 55,
    },
  },
};

interface IWaitTimeScreenProps {
  navigation: WaitTimeScreenProps["navigation"];
}
