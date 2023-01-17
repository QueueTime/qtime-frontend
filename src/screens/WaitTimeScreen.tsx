import { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
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
      <ScrollView
        style={[theme.styles.screenContainer, styles.container]}
        keyboardShouldPersistTaps={"always"}
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
            <Tag style={styles.tags} styles={styles.tagStyles}>
              Food
            </Tag>
            <Tag style={styles.tags} styles={styles.tagStyles}>
              Transport
            </Tag>
            <Tag style={styles.tags} styles={styles.tagStyles}>
              Library
            </Tag>
            <Tag style={styles.tags} styles={styles.tagStyles}>
              Gym
            </Tag>
          </ScrollView>
        </View>
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
          style={{ height: 100 }}
          popup
          visible={isVisible}
          animationType="slide-up"
          onClose={() => {
            setIsVisible(false);
          }}
        >
          <View style={styles.modalHeader}>
            <StyledText
              style={styles.modalCancel}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              Cancel
            </StyledText>
            <StyledText style={styles.modalSortBy}>Sort By</StyledText>
            <StyledText
              style={styles.modalOK}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              OK
            </StyledText>
          </View>
        </Modal>
      </ScrollView>
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
  tagStyles: {
    activeWrap: {
      backgroundColor: "#1677FF",
    },
    activeText: {
      color: "#F5F5F5",
    },
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
  modalCancel: {
    // textAlign: "left",
    color: "#1677FF",
    // marginLeft: 10,
  },
  modalSortBy: {
    // textAlign: "center",
  },
  modalHeader: {
    // paddingTop: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "red",
  },
  modalOK: {
    // textAlign: "right",
    color: "#1677FF",
    // marginRight: 10,
  },
});

interface IWaitTimeScreenProps {
  navigation: LocationDetailsScreenProps["navigation"];
}
