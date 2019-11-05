import React from 'react';

export const getDefaultViewport = () => ({
  width: '100%',
  height: 'window.innerHeight',
  latitude: -33.7736634,
  longitude: 151.0881422,
  zoom: 12
});

export const defaultApplication = {
  defaultText: 'Select a map marker to view the application'
};

export const MapViewportContext = React.createContext({
  location: getDefaultViewport()
});
