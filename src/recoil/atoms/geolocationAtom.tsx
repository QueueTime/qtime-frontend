import { atom } from "recoil";

export const userGeolocationState = atom({
  key: "userGeolocationState",
  default: { latitude: null, longitude: null, timestamp: 0 },
});

export const apiLastCalledTimestampState = atom({
  key: "apiLastCalledTimestampState",
  default: 0,
});
