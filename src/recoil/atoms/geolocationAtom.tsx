import { atom } from "recoil";

export const userGeolocationState = atom({
  key: "userGeolocationState",
  default: { latitude: 0, longitude: 0, timestamp: 0 },
});

export const apiLastCalledTimestampState = atom({
  key: "apiLastCalledTimestampState",
  default: 0,
});
