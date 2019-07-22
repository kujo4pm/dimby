import axios from 'axios';

const BASE_URL = 'https://nominatim.openstreetmap.org/';
const searchForAddresses = fetchObj => {
  const { limit = 3, q, polygonGeojson = 0 } = fetchObj;
  return axios({
    method: 'get',
    url: `${BASE_URL}search`,
    params: {
      q,
      format: 'json',
      countrycodes: 'au', // limit to Australia
      limit,
      polygon_geojson: polygonGeojson
    }
  });
};

export { searchForAddresses };
