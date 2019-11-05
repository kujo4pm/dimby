import { API_LIST, fetch } from '.';
const getImage = async fetchObj => {
  const { address } = fetchObj;
  console.log('fetching image for:', address);
  const imageData = await fetch(API_LIST.OPEN_STREET_VIEW, {
    address
  });
  return imageData.data;
};

export { getImage };
