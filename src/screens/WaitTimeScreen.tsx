import { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import {
  Button,
  SearchBar,
  Tag,
  Modal,
  WingBlank,
  Steps,
} from "@ant-design/react-native";
import { Feather } from "@expo/vector-icons";

import { StyledText } from "@components/StyledText";
import { LOCATION_DETAILS } from "@constants/routes";
import { LocationDetailsScreenProps } from "@navigators/WaitTimeStackNavigator";
import { ThemeContext } from "@contexts/theme";

const Step = Steps.Step;

export const WaitTimeScreen = ({ navigation }: IWaitTimeScreenProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState("Distance");
  const steps1 = [
    { title: "5 mins", description: "Lowest" },
    { title: "7 mins", description: "Average" },
    { title: "17 mins", description: "Highest" },
  ];

  const { theme } = useContext(ThemeContext);
  let searchBar: SearchBar | null;
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
            <Tag style={styles.tags} styles={StylesOverride.tagStyles}>
              Food
            </Tag>
            <Tag style={styles.tags} styles={StylesOverride.tagStyles}>
              Transport
            </Tag>
            <Tag style={styles.tags} styles={StylesOverride.tagStyles}>
              Library
            </Tag>
            <Tag style={styles.tags} styles={StylesOverride.tagStyles}>
              Gym
            </Tag>
          </ScrollView>
        </View>
        <Modal
          transparent={false}
          visible={isVisible}
          animationType="slide-up"
          popup
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0)",
          }}
        >
          <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback>
                <View style={styles.modalHeader}>
                  <View style={styles.modalActionRow}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsVisible(false);
                      }}
                    >
                      <StyledText style={styles.modalButtons}>
                        Cancel
                      </StyledText>
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
                      style={{
                        borderColor: "#FFFFFF",
                        alignItems: "flex-start",
                      }}
                      onPress={() => {
                        setIsVisible(false);
                        setSortBy("Time");
                      }}
                    >
                      <StyledText>Time</StyledText>
                      {sortBy === "Time" && (
                        <Feather name="check" size={24} color="black" />
                      )}
                    </Button>
                    <Button
                      style={{
                        borderColor: "#FFFFFF",
                        alignItems: "flex-start",
                      }}
                      onPress={() => {
                        setIsVisible(false);
                        setSortBy("Distance");
                      }}
                    >
                      <StyledText>Distance</StyledText>
                      {sortBy === "Distance" && (
                        <Feather name="check" size={24} color="black" />
                      )}
                    </Button>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Steps
            styles={StylesOverride.stepsStyles}
            size="small"
            direction="horizontal"
          >
            {steps1.map((item: any, index: any) => (
              <Step
                key={index}
                title={
                  <View
                    style={{
                      backgroundColor: index === 0 ? "green" : "red",
                      // marginLeft: -20,
                    }}
                  >
                    <StyledText style={{ paddingTop: 10 }}>
                      {item.title}
                    </StyledText>
                  </View>
                }
                description={
                  <View>
                    <StyledText style={{ color: "#999999" }}>
                      {item.description}
                    </StyledText>
                  </View>
                }
                status={"wait"}
              />
            ))}
          </Steps>
        </View>
        <View
          style={{
            paddingTop: 50,
            borderBottomColor: "#EEEEEE",
            borderBottomWidth: 1,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  huge: {
    fontSize: 20,
  },
  container: {},
  searchContainer: {
    paddingTop: 20,
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
    width: 85,
    height: 34,
    backgroundColor: "#FFFFFF",
    marginRight: 6,
  },
  sortByText: {
    fontSize: 15,
    textAlign: "center",
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
    content_s_h: {},
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
  navigation: LocationDetailsScreenProps["navigation"];
}
