const { REACT_APP_OPEN_STREET_VIEW_KEY: OPEN_STREET_VIEW_KEY } = process.env;
const BASE_URL = 'https://maps.googleapis.com/maps/api/streetview';
const getImageUrl = fetchObj => {
  const { address } = fetchObj;
  console.log('fetching image for:', address);
  return encodeURI(
    `${BASE_URL}?location=${address}&size=400x200&key=${OPEN_STREET_VIEW_KEY}`
  );
};

export { getImageUrl };
