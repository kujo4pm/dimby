import React from 'react';

export const defaultViewport = {
  width: '100%',
  height: 'window.innerHeight',
  latitude: -37.75407,
  longitude: 145.00123,
  zoom: 12
};
export const MapViewportContext = React.createContext({
  location: defaultViewport,
  updateLocation: () => {}
});
