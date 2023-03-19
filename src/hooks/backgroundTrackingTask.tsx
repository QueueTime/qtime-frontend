import { useEffect } from "react";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK_NAME = "LOCATION_BACKGROUND_TRACKING";

// Define the background task for location tracking
TaskManager.defineTask(
  LOCATION_TASK_NAME,
  async ({ data, error }: { data: any; error: any }) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      // Call API to update user location
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
