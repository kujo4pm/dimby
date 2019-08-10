import axios from 'axios';
const {
  REACT_APP_OPEN_PLANNING_API_TOKEN: OPEN_PLANNING_API_TOKEN
} = process.env;
const BASE_URL =
  'https://cors-anywhere.herokuapp.com/https://api.planningalerts.org.au/applications.js';
const fetchAlerts = ({ bottomLeft, topRight }) => {
  return axios({
    method: 'get',
    url: BASE_URL,
    params: {
      key: OPEN_PLANNING_API_TOKEN,
      bottom_left_lat: bottomLeft.lat,
      bottom_left_lng: bottomLeft.lng,
      top_right_lat: topRight.lat,
      top_right_lng: topRight.lng
    }
  });
};

export { fetchAlerts };
