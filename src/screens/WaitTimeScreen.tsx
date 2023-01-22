import { useCallback, useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
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
} from "@expo/vector-icons";

import { StyledText } from "@components/StyledText";
import { LOCATION_DETAILS } from "@constants/routes";
import { WaitTimeScreenProps } from "@navigators/WaitTimeStackNavigator";
import { ThemeContext } from "@contexts/theme";
import { renderLastUpdated } from "@utils/waitTime";
import { SortByEnum } from "@utils/poi";

function renderIcon(type: any, theme: string): JSX.Element {
  switch (type) {
    case "food":
      return <MaterialIcons name={"restaurant"} size={24} color={theme} />;
    case "shopping":
      return <AntDesign name="shoppingcart" size={24} color={theme} />;
    case "transport":
      return <Ionicons name="bus-outline" size={24} color={theme} />;
    default: // just temporarily for the sake of return type
      return <MaterialIcons name={"restaurant"} size={24} color={theme} />;
  }
}

export const WaitTimeScreen = ({ navigation }: IWaitTimeScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const [searchValue, setSearchValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState(SortByEnum.DISTANCE);
  const [refreshing, setRefreshing] = useState(false);

  let searchBar: SearchBar | null;

  const poiTypes = ["Food", "Transport", "Gym", "Library"];
  const steps1 = [
    { title: "5 mins", description: "Lowest" },
    { title: "7 mins", description: "Average" },
    { title: "17 mins", description: "Highest" },
  ];

  const poiData = [
    {
      waitTime: 10,
      location: "Centro",
      distance: 0.5,
      lastUpdated: 5,
      type: "food",
    },
    {
      waitTime: 7,
      location: "Location 2",
      distance: 0.6,
      lastUpdated: 8,
      type: "shopping",
    },
    {
      waitTime: 15,
      location: "Location 3",
      distance: 1.2,
      lastUpdated: 0,
      type: "food",
    },
    {
      waitTime: 4,
      location: "Location 4",
      distance: 1.5,
      lastUpdated: 68,
      type: "transport",
    },
    {
      waitTime: 6,
      location: "Location 5",
      distance: 0.2,
      lastUpdated: 1,
      type: "shopping",
    },
    {
      waitTime: 17,
      location: "Location 6",
      distance: 0.1,
      lastUpdated: 4,
      type: "food",
    },
    {
      waitTime: 4,
      location: "Location 7",
      distance: 2.0,
      lastUpdated: 0,
      type: "food",
    },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
            <View style={styles.modalHeader}>
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
                  style={styles.sortButtons}
                  onPress={() => {
                    setIsVisible(false);
                    setSortBy(SortByEnum.TIME);
                  }}
                >
                  <StyledText>Time</StyledText>
                  <View style={styles.checkIconTime}>
                    {sortBy === "Time" && (
                      <Feather name="check" size={24} color="black" />
                    )}
                  </View>
                </Button>
                <Button
                  style={styles.sortButtons}
                  onPress={() => {
                    setIsVisible(false);
                    setSortBy(SortByEnum.DISTANCE);
                  }}
                >
                  <StyledText>Distance</StyledText>
                  <View style={styles.checkIconDistance}>
                    {sortBy === "Distance" && (
                      <Feather name="check" size={24} color="black" />
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
      <View style={theme.styles.screenContainer}>
        <View style={styles.searchContainer}>
          <SearchBar
            ref={(el) => ((searchBar as any) = el)}
            placeholderTextColor={theme.styles.placeholderText.color}
            style={styles.searchBar}
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
            {poiTypes.map((type: string) => {
              return (
                <Tag
                  key={type}
                  style={styles.tags}
                  styles={StylesOverride.tagStyles}
                >
                  {type}
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
            {steps1.map((item: any) => (
              <Steps.Step key={item.description} status={"wait"} />
            ))}
          </Steps>
        </View>
        <View style={styles.stepTextContainer}>
          {steps1.map((item: any) => (
            <View style={styles.stepTextView} key={item.description}>
              <StyledText style={styles.stepTitleText}>{item.title}</StyledText>
              <StyledText style={styles.stepDescriptionText}>
                {item.description}
              </StyledText>
            </View>
          ))}
        </View>
        <View style={styles.stepScrollDivider} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <List>
            {poiData.map((poi: any) => (
              <List.Item
                key={poi.location}
                onPress={() => {
                  navigation.navigate(LOCATION_DETAILS, {
                    location: poi.location,
                  });
                }}
                extra={
                  <View>
                    <List.Item.Brief style={styles.poiWaitTimeText}>
                      {poi.waitTime + " mins"}
                    </List.Item.Brief>
                  </View>
                }
                arrow="horizontal"
                thumb={
                  <View style={styles.poiIcon}>
                    {renderIcon(poi.type, theme.waitIconColor)}
                  </View>
                }
              >
                <StyledText style={styles.poiDistanceText}>
                  {poi.distance + " km"}
                </StyledText>
                <StyledText>{poi.location}</StyledText>
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
  searchContainer: {
    paddingTop: 35,
    backgroundColor: "#FFFFFF",
  },
  searchBar: {
    borderRadius: 6,
    backgroundColor: "#F5F5F5",
  },
  search: {
    backgroundColor: "#F5F5F5",
  },
  sortContainer: {
    paddingTop: 20,
  },
  tags: {
    paddingRight: 6,
  },
  sortByTag: {
    borderRadius: 24,
    height: 34,
    backgroundColor: "#FFFFFF",
    marginRight: 6,
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
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  sortButtons: {
    borderColor: "#FFFFFF",
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
