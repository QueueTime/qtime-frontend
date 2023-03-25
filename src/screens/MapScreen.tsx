import { useEffect, useContext, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import { useIsFocused } from "@react-navigation/native";

import MapView from "react-native-maps";
import { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";

import { poiApi } from "@api/client/apis";
import { GetAllPOI200ResponseInner } from "@api/generated/api";
import { displayError } from "@utils/error";
import { AuthContext } from "@contexts/auth";
import { userGeolocationState } from "@atoms/geolocationAtom";
import { StyledText } from "@components/StyledText";

type POI = GetAllPOI200ResponseInner;

export const MapScreen = () => {
  const { user } = useContext(AuthContext);
  const [poiData, setPoiData] = useState<POI[]>([]);
  const { latitude, longitude } = useRecoilValue(userGeolocationState);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getAllPOIs = async () => {
      try {
        const res = await poiApi.getAllPOI(
          latitude,
          longitude,
          undefined,
          undefined,
          {
            headers: { Authorization: `Bearer ${await user!.getIdToken()}` },
          }
        );
        setPoiData(res.data);
      } catch (err: any) {
        displayError(
          `Failed update the map. ${err?.response?.data?.message || err}`
        );
      }
    };
    getAllPOIs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <MapView
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
      style={styles.map}
      initialRegion={{
        latitude: 43.2610508878718,
        longitude: -79.91922539929718,
        latitudeDelta: 0.011,
        longitudeDelta: 0.008,
      }}
      showsUserLocation={true}
    >
      {poiData.map((poi: POI) => (
        <Marker
          key={poi._id}
          coordinate={{
            latitude: poi.location?.latitude || 0,
            longitude: poi.location?.longitude || 0,
          }}
          image={require("@assets/images/location-pin.png")}
        >
          <Callout>
            <View style={styles.callout}>
              <StyledText fontWeight="bold">{poi.name}</StyledText>
              <StyledText style={styles.calloutDescription}>
                {poi.class === "queue"
                  ? poi.estimate + (poi.estimate === 1 ? " min" : " mins")
                  : `${poi.estimate}% full`}
              </StyledText>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  callout: {
    padding: 1,
  },
  calloutDescription: {
    textAlign: "center",
  },
});
