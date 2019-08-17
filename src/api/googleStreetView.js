const { REACT_APP_OPEN_STREET_VIEW_KEY: OPEN_STREET_VIEW_KEY } = process.env;
const BASE_URL = 'https://maps.googleapis.com/maps/api/streetview';
const getImageUrl = fetchObj => {
  const { address, latitude, longitude } = fetchObj;
  console.log('fetching image for:', address);
  return encodeURI(
    `${BASE_URL}?location=${address}&size=400x400&key=${OPEN_STREET_VIEW_KEY}`
  );
  // return axios({
  //   method: 'get',
  //   url: BASE_URL,
  //   params: {
  //     location: address,
  //     size: '400x400',
  //     //location: `${latitude}, ${longitude}`,
  //     key: OPEN_STREET_VIEW_KEY
  //   }
  // });
};

export { getImageUrl };
