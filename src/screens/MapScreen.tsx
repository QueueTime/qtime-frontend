import { useEffect, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { useIsFocused } from "@react-navigation/native";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { poiApi } from "@api/client/apis";
import { GetAllPOI200ResponseInner } from "@api/generated/api";
import { displayError } from "@utils/error";
import { AuthContext } from "@contexts/auth";
import { userGeolocationState } from "@atoms/geolocationAtom";

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
          "queue",
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
          title={poi.name}
          description={poi.estimate + (poi.estimate === 1 ? " min" : " mins")}
          image={require("@assets/images/location-pin.png")}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
