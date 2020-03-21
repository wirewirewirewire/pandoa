import * as Location from "expo-location";
import { LOCATION_TRACKING } from "../constants/Tracking";

const startLocationTracking = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 1000 * 20,
    distanceInterval: 0
  });

  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TRACKING
  );
  console.log("tracking started?", hasStarted);
};

export default startLocationTracking;
