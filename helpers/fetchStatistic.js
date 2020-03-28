import * as Location from "expo-location";
import axios from "axios";

/**
 * Get statistic for world and region
 *
 * @param currentLocation
 * @returns {Promise<{}>}
 */
const fetchStatistic = async (currentLocation) => {
  let result = {};
  
  let geocode = await Location.reverseGeocodeAsync({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude
  });
  
  // Get data for region
  if (geocode && geocode.length > 0) {
    const { data } = await axios.get('https://rki-covid-api.now.sh/api/states');
    if (data.states && data.states.length > 0) {
      const region = data.states.find((item) => item.name === geocode[0].region)
      result.region = {
        region: geocode[0].region + ', ' + geocode[0].isoCountryCode,
        cases: region.count,
        recovered: 0,
        deaths: region.deaths
      }
    }
  }
  
  // Get data for world
  const { data } = await axios.get('https://corona.lmao.ninja/all');
  if (data) {
    result.world = {
      cases: data.cases,
      recovered: data.recovered,
      deaths: data.deaths,
      updated: data.updated
    }
  }
  
  return result
};

export default fetchStatistic;
