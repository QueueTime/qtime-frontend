import { useEffect } from "react";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import { displayError } from "@utils/error";
import { locationService } from "@utils/locationService";

export const LOCATION_TASK_NAME = "LOCATION_BACKGROUND_TRACKING";

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
      locationService.setLocation({ latitude, longitude });
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
      });
    };
    startBackgroundTracking();
  }, []);
};
