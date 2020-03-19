import * as Location from "expo-location";
const LOCATION_TRACKING = "location-tracking";

const startLocationTracking = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 1000 * 20,
    distanceInterval: 90
  });
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TRACKING
  );
  console.log("tracking started?bb", hasStarted);
};

export default startLocationTracking;
