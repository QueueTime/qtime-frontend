import { useEffect } from "react";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import { setRecoil } from "recoil-nexus";

import { displayError } from "@utils/error";
import { userGeolocationState } from "@atoms/geolocationAtom";

export const LOCATION_TASK_NAME = "LOCATION_BACKGROUND_TRACKING";

// Use is ready var to track when the app is fully rendered
process.env.IS_READY = "false";

// Define the background task for location tracking
TaskManager.defineTask(
  LOCATION_TASK_NAME,
  async ({ data, error }: { data: any; error: any }) => {
    if (error) {
      displayError(error);
      return;
    }
    if (data) {
      const { latitude, longitude } = data.locations[0].coords;
      // Use IS_READY to delay the update of the geolocation state to avoid getting setRecoil is not a function error
      if (process.env.IS_READY === "true") {
        setRecoil(userGeolocationState, {
          latitude,
          longitude,
          timestamp: Date.now(),
        });
      }
    }
  }
);

export const useBackgroundLocation = () => {
  // Starting background location tracking task
  useEffect(() => {
    const startBackgroundTracking = async () => {
      // Make sure the task is defined otherwise do not start tracking
      const isTaskDefined = TaskManager.isTaskDefined(LOCATION_TASK_NAME);
      if (!isTaskDefined) {
        return;
      }

      // Don't track if it is already running in background
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TASK_NAME
      );
      if (hasStarted) {
        return;
      }

      // Runs every 10 seconds
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        showsBackgroundLocationIndicator: false,
        timeInterval: 10000,
        distanceInterval: 0,
      });
    };
    startBackgroundTracking();
  }, []);
};
