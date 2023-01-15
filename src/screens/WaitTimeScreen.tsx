import { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View } from "react-native";

import { Button, WhiteSpace, SearchBar } from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";
import { LOCATION_DETAILS } from "@constants/routes";
import { LocationDetailsScreenProps } from "@navigators/WaitTimeStackNavigator";
import { ThemeContext } from "@contexts/theme";

export const WaitTimeScreen = ({ navigation }: IWaitTimeScreenProps) => {
  const [searchValue, setSearchValue] = useState("");

  const { theme } = useContext(ThemeContext);
  return (
    <ScrollView style={[theme.styles.screenContainer, styles.container]}>
      <View style={styles.searchContainer}>
        <SearchBar
          style={styles.searchBar}
          value={searchValue}
          placeholder="Search places"
          onChange={(value) => {
            setSearchValue(value);
          }}
          onSubmit={(value) => {
            setSearchValue(value);
          }}
          showCancelButton={false}
        />
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
});

interface IWaitTimeScreenProps {
  navigation: LocationDetailsScreenProps["navigation"];
}
