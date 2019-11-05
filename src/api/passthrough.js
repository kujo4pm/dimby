import axios from 'axios';
const {
  REACT_APP_PASSTHROUGH_API: PASSTHROUGH_API,
  REACT_APP_CLIENT_TOKEN: CLIENT_TOKEN
} = process.env;
const fetch = (apiKey, params) => {
  return axios({
    method: 'get',
    url: PASSTHROUGH_API,
    params: {
      apiKey,
      ...params
    },
    headers: {
      Authorization: CLIENT_TOKEN
    }
  });
};

const API_LIST = {
  ADDRESS_SEARCH: 'ADDRESS_SEARCH',
  OPEN_PLANNING: 'OPEN_PLANNING',
  OPEN_STREET_VIEW: 'OPEN_STREET_VIEW'
};
export { fetch, API_LIST };
