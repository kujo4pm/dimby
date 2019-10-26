import { fetch, API_LIST } from '.';
const fetchAlerts = ({ bottomLeft, topRight }) => {
  console.log(`fetching for ${(bottomLeft, topRight)} `);
  return fetch(API_LIST.OPEN_PLANNING, {
    bottom_left_lat: bottomLeft.lat,
    bottom_left_lng: bottomLeft.lng,
    top_right_lat: topRight.lat,
    top_right_lng: topRight.lng
  });
};

export { fetchAlerts };
