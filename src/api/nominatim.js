import { fetch, API_LIST } from '.';

const searchForAddresses = fetchObj => {
  const { limit = 6, q, polygonGeojson = 0 } = fetchObj;
  return fetch(API_LIST.ADDRESS_SEARCH, {
    q,
    limit,
    polygon_geojson: polygonGeojson
  });
};

export { searchForAddresses };
