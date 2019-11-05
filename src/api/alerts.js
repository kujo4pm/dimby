import { fetch, API_LIST } from '.';

// signature ensures we only get the latest
const getSignature = ({ bottomLeft, topRight }) =>
  `${JSON.stringify(bottomLeft)}_${JSON.stringify(topRight)}`;

const fetchAlerts = async ({ bottomLeft, topRight }) => {
  console.log(`fetching for ${(bottomLeft, topRight)} `);
  const { data } = await fetch(API_LIST.OPEN_PLANNING, {
    bottom_left_lat: bottomLeft.lat,
    bottom_left_lng: bottomLeft.lng,
    top_right_lat: topRight.lat,
    top_right_lng: topRight.lng
  });
  return {
    signature: getSignature({ bottomLeft, topRight }),
    data
  };
};

export { fetchAlerts, getSignature };
