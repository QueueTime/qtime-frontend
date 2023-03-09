import { useContext, useRef, useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Animated,
  FlatList,
  useWindowDimensions,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import * as Location from "expo-location";

import { ExpandingDot } from "react-native-animated-pagination-dots";
import { View, Button } from "@ant-design/react-native";
import { Feather } from "@expo/vector-icons";

import { ThemeContext } from "@contexts/theme";
import { StyledText } from "@components/StyledText";
import { AuthContext } from "@contexts/auth";
import { completeUserOnboarding } from "@utils/firestore";
import { displayError } from "@utils/error";
import { usePreventBack } from "@hooks/preventBack";

interface ICarouselItemProps {
  key: string;
  title: string;
  content: string;
  image: ImageSourcePropType;
}

const CAROUSEL_ITEMS: ICarouselItemProps[] = [
  {
    key: "A",
    title: "Your connection\nis the key.",
    content:
      "Anonymous identifier keys are constantly exchanged between people using QTime wherever you go.",
    image: require("@assets/images/OnboardingA.png"),
  },
  {
    key: "B",
    title: "Help out your McMaster\ncommunity.",
    content:
      "Everyone's time is valuable, so share your estimated wait times for POIs on campus and view times submitted by others.",
    image: require("@assets/images/OnboardingB.png"),
  },
  {
    key: "C",
    title: "Privacy is our number\none priority.",
    content:
      "All data is stored locally on your device and your identity is not shared with anyone.\n",
    image: require("@assets/images/OnboardingC.png"),
  },
  {
    key: "D",
    title: "Allow location for accurate\nwait times.",
    content:
      "Allow QTime to access your location to get the most accurate wait times possible.",
    image: require("@assets/images/OnboardingD.png"),
  },
];

/**
 * Wrapper component around the onboarding screen to pass the `onComplete` prop.
 * since it's a pain to pass it through the navigator. Only required for the stack navigator.
 * See https://reactnavigation.org/docs/hello-react-navigation/#passing-additional-props.
 */
export const OnboardingScreenForNavigator = () => {
  const { userProfile } = useContext(AuthContext);

  // Prevent going back
  usePreventBack();

  const completeOnboarding = async () => {
    try {
      await completeUserOnboarding(userProfile!.email);
    } catch (error) {
      displayError(`Failed to complete onboarding. Try again later. ${error}`);
    }
  };

  return <OnboardingScreen onComplete={completeOnboarding} />;
};

/**
 * Onboarding screen with swipe-style carousel of onboarding screens
 * @param onComplete Function to run when the user completes the onboarding. Displays a checkmark button on last page.
 * @param onExit Function to run if the user chooses to exit the onboarding flow. Displays an 'x' button in the top right.
 */
export const OnboardingScreen = ({
  onComplete,
  onExit,
}: IOnboardingScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();

  // Index of current carousel page
  const [activeIndex, setActiveIndex] = useState(0);
  // Flatlist prop that calculates current item index
  const onViewRef = useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0].index);
  });
  const isLastOnboardingPage = activeIndex === CAROUSEL_ITEMS.length - 1;
  let backgroundPermission: Location.PermissionResponse;

  const requestPermissions = () => {
    Alert.alert(
      "Allow Location Access",
      "In order to use this app to its full potential, please allow location access. Set location access to 'Always' for the best experience.",
      [
        {
          text: "Open Settings",
          style: "default",
          onPress: () => Linking.openSettings(),
        },
      ]
    );
  };

  const getTrackingPermission = async () => {
    await Location.requestForegroundPermissionsAsync();
    backgroundPermission = await Location.requestBackgroundPermissionsAsync();
  };

  const completeOnboarding = async () => {
    if (isLastOnboardingPage) {
      await getTrackingPermission();
      if (!backgroundPermission.granted) {
        requestPermissions();
      } else {
        if (onComplete) {
          onComplete();
        }
      }
    }
  };

  // Animate the fade-in and fade-out of the complete button
  const [completeFadeButtonAnimation] = useState(new Animated.Value(0));
  useEffect(() => {
    if (isLastOnboardingPage) {
      // Fade in
      Animated.timing(completeFadeButtonAnimation, {
        toValue: 1,
        duration: 350,
        useNativeDriver: false,
      }).start();
      return;
    }
    // Fade out if not on last page
    Animated.timing(completeFadeButtonAnimation, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [activeIndex, completeFadeButtonAnimation, isLastOnboardingPage]);

  // Flatlist scroll ref
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderCarouselItem = useCallback(
    ({ item }: { item: ICarouselItemProps }) => {
      return (
        <View
          style={[
            styles.carouselItem,
            // Width of each item should be the full screen - padding
            { width: width },
          ]}
        >
          <Image style={styles.carouselImage} source={item.image} />
          <StyledText
            style={[theme.styles.primaryColor, styles.title]}
            fontWeight="bold"
          >
            {item.title}
          </StyledText>
          <StyledText style={[theme.styles.subText, styles.subtext]}>
            {item.content}
          </StyledText>
        </View>
      );
    },
    [width, theme.styles.primaryColor, theme.styles.subText]
  );

  return (
    <View style={[theme.styles.screenContainer, styles.container]}>
      {onExit && (
        <View style={styles.exitContainer}>
          <TouchableOpacity onPress={() => onExit()} testID="exit-button">
            <Feather
              name="x"
              size={30}
              color={theme.styles.placeholderText.color}
            />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={CAROUSEL_ITEMS}
        style={styles.flatList}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        onViewableItemsChanged={onViewRef.current}
        horizontal
        decelerationRate={"normal"}
        scrollEventThrottle={16}
        renderItem={renderCarouselItem}
      />
      <View style={styles.footer}>
        {/* Empty view to make up the left 1/3 of the footer */}
        <View style={styles.footerItem} />
        <View style={styles.footerItem}>
          <ExpandingDot
            data={CAROUSEL_ITEMS}
            expandingDotWidth={30}
            scrollX={scrollX}
            inActiveDotColor={theme.styles.inactiveColor.color}
            activeDotColor={theme.styles.primaryColor.color}
            inActiveDotOpacity={0.5}
            dotStyle={styles.dotStyles}
            containerStyle={{}}
          />
        </View>
        <Animated.View
          style={[
            styles.footerItem,
            styles.completeButtonContainer,
            { opacity: completeFadeButtonAnimation },
          ]}
        >
          {onComplete && (
            <Button
              style={styles.completeButton}
              type="primary"
              onPress={async () => {
                await completeOnboarding();
              }}
            >
              <Feather name="check" size={20} color="#ffffff" />
            </Button>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0, // override screen padding to ensure swiping at edges
  },
  flatList: {
    flex: 1,
    marginBottom: 40,
  },
  carouselItem: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  carouselImage: {
    width: 270,
    height: 220,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginTop: 40,
  },
  subtext: {
    textAlign: "center",
    marginTop: 10,
  },
  dotStyles: {
    width: 6,
    height: 6,
    borderRadius: 10,
    marginHorizontal: 2.5,
  },
  footer: {
    flexDirection: "row",
  },
  footerItem: {
    flex: 1,
  },
  completeButtonContainer: {
    alignItems: "flex-end",
    marginTop: -60,
  },
  completeButton: {
    width: 50,
    height: 50,
    borderRadius: 999,
    marginRight: 25,
  },
  exitContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingTop: 20,
    paddingRight: 25,
    zIndex: 1,
  },
});

interface IOnboardingScreenProps {
  onComplete?: () => void;
  onExit?: () => void;
}
