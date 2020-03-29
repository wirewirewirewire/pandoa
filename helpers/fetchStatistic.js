import * as Location from "expo-location";
import axios from "axios";

const rkiRegions = {
  'Baden-Württemberg': 'BW',
  'Bayern': 'BY',
  'Berlin': 'BE',
  'Brandenburg': 'BB',
  'Bremen': 'HB',
  'Hamburg': 'HH',
  'Mecklenburg-Vorpommern': 'MV',
  'Niedersachsen': 'NI',
  'Nordrhein-Westfalen': 'NW',
  'Rheinland-Pfalz': 'RP',
  'Saarland': 'SL',
  'Sachsen': 'SN',
  'Sachsen-Anhalt': 'ST',
  'Schleswig-Holstein': 'SH',
  'Thüringen': 'TH',
};

/**
 * Get statistic for world and region
 *
 * @param currentLocation
 * @returns {Promise<{}>}
 */
const fetchStatistic = async (currentLocation) => {
  let result = {};
  const promises = [];
  
  let geocode = await Location.reverseGeocodeAsync({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude
  });
  
  promises.push(fetchWorld());
  
  // Get data for country and region
  if (geocode && geocode.length > 0) {
    const geolocation = geocode[0];
    // Fetch country
    promises.push(fetchCountry(geolocation.isoCountryCode));
    if (geolocation.isoCountryCode === 'DE') {
      // Fetch region
      promises.push(fetchRegion(rkiRegions[geolocation.region]));
    }
  }
  
  const response = await Promise.all(promises);
  result.world = response[0];
  result.country = response[1];
  result.region = response[2];
  
  return result;
};

/**
 * Fetch data from region in country (only for Germany)
 *
 * @param region
 *
 * @returns {Promise<{}|{recovered: null, cases: *, updated: null, deaths: *}>}
 */
const fetchRegion = async (region) => {
  try {
    const response = await axios.get('https://rki-covid-api.now.sh/api/states');
    if (response.status === 200) {
      // Filter region
      const data = response.data.states.find((item) => item.code === region);
      return {
        region: region,
        cases: data.count,
        recovered: null,
        deaths: data.deaths,
        updated: null
      }
    }
  } catch (e) {
    console.error(e.message);
  }
  return {}
};

/**
 * Fetch data from country
 *
 * @param country In iso2
 *
 * @returns {Promise<{recovered: (number|null), cases: any, updated: null, deaths: any}|{}>}
 */
const fetchCountry = async (country) => {
  try {
    const response = await axios.get('https://corona-stats.online/' + country + '?format=json');
    if (response.status === 200) {
      const data = response.data.data[0];
      return {
        country: country,
        cases: data.cases,
        recovered: data.recovered,
        deaths: data.deaths,
        updated: data.updated
      }
    }
  } catch (e) {
    console.error(e.message);
  }
  return {}
};

/**
 * Fetch data from world
 *
 * @returns {Promise<{recovered: (number|null), cases: any, updated: null, deaths: any}|{}>}
 */
const fetchWorld = async () => {
  try {
    const response = await axios.get('https://corona.lmao.ninja/all');
    if (response.status === 200) {
      const data = response.data;
      return {
        cases: data.cases,
        recovered: data.recovered,
        deaths: data.deaths,
        updated: data.updated
      }
    }
  } catch (e) {
    console.error(e.message);
  }
  return {}
};

export default fetchStatistic;
