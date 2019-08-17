import React from 'react';

export const getDefaultViewport = () => {
  const defaultViewport = {
    width: '100%',
    height: 'window.innerHeight',
    latitude: -37.75407,
    longitude: 145.00123,
    zoom: 12
  };
  if (!navigator.geolocation) return defaultViewport;
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    console.log(longitude, latitude);
  });
  return defaultViewport;
};

export const defaultApplication = {
  defaultText: 'Select a map marker to view the application'
};

export const MapViewportContext = React.createContext({
  location: getDefaultViewport(),
  updateLocation: () => {},
  updateApplication: () => {}
});
