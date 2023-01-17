import { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from "react-native";

import { Button, WhiteSpace, SearchBar, Tag } from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";
import { LOCATION_DETAILS } from "@constants/routes";
import { LocationDetailsScreenProps } from "@navigators/WaitTimeStackNavigator";
import { ThemeContext } from "@contexts/theme";

export const WaitTimeScreen = ({ navigation }: IWaitTimeScreenProps) => {
  const [searchValue, setSearchValue] = useState("");

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
            <Button style={styles.sortByTag}>
              <StyledText style={styles.sort}>Sort By</StyledText>
            </Button>
            <Tag
              style={styles.tags}
              styles={{
                normalWrap: {
                  backgroundColor: "green",
                },
              }}
            >
              Food
            </Tag>
            <Tag style={styles.tags}>Transport</Tag>
            <Tag style={styles.tags}>Library</Tag>
            <Tag style={styles.tags}>Gym</Tag>
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
        <StatusBar style="auto" />
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
  tags: {
    paddingRight: 6,
  },
  sortByTag: {
    paddingRight: 6,
    borderRadius: 24,
    flexDirection: "row",
    width: 97,
    height: 37,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  sort: {
    fontSize: 15,
    textAlign: "center",
  },
});

interface IWaitTimeScreenProps {
  navigation: LocationDetailsScreenProps["navigation"];
}
