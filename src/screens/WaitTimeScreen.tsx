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
  WhiteSpace,
  SearchBar,
  Tag,
  Modal,
} from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";
import { LOCATION_DETAILS } from "@constants/routes";
import { LocationDetailsScreenProps } from "@navigators/WaitTimeStackNavigator";
import { ThemeContext } from "@contexts/theme";

export const WaitTimeScreen = ({ navigation }: IWaitTimeScreenProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { theme } = useContext(ThemeContext);
  let searchBar: SearchBar | null;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        searchBar?.inputRef?.blur();
      }}
    >
      <View
        style={[theme.styles.screenContainer, styles.container]}
        // keyboardShouldPersistTaps={"always"}
      >
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
        <WhiteSpace />
        <StyledText style={styles.huge}>Wait Times</StyledText>
        <WhiteSpace />
        <Button
          type={"primary"}
          onPress={() =>
            navigation.navigate(LOCATION_DETAILS, { location: "Location X" })
          }
        >
          <StyledText>Go to Location X</StyledText>
        </Button>

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
                    <StyledText style={styles.modalSortBy}>Sort By</StyledText>
                    <TouchableOpacity
                      onPress={() => {
                        setIsVisible(false);
                      }}
                    >
                      <StyledText style={styles.modalButtons}>OK</StyledText>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Button style={{ borderColor: "#FFFFFF" }}>
                      <StyledText style={{ textAlign: "left" }}>
                        Time
                      </StyledText>
                    </Button>
                    <Button style={{ borderColor: "#FFFFFF" }}>
                      <StyledText>Distance</StyledText>
                    </Button>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
    paddingTop: 50,
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
  },
  modalSortBy: {},
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
};

interface IWaitTimeScreenProps {
  navigation: LocationDetailsScreenProps["navigation"];
}
