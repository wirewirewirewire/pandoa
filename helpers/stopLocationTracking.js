import * as Location from "expo-location";
import { LOCATION_TRACKING } from "../constants/Tracking";

const stopLocationTracking = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
};

export default stopLocationTracking;
