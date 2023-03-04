import { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

export const usePreventBack = (callback: () => void = () => {}) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => e.preventDefault());
    callback();
  }, [navigation, callback]);
};
