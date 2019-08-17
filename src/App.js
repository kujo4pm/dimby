import React from 'react';
import styled from 'styled-components';

import { Map, MapViewportContext } from './components/Map';
import {
  getDefaultViewport,
  defaultApplication
} from './components/Map/MapViewportContext';
import { Sidebar } from './components/Sidebar';

const Main = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  height: ${window.innerHeight}px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.resetViewport = viewport => {
      this.setState(state => ({
        ...state,
        viewport
      }));
    };

    this.selectApplication = application => {
      this.setState(state => ({
        ...state,
        application
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      viewport: getDefaultViewport(),
      application: defaultApplication
    };
  }

  componentWillMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.resetViewport({ latitude, longitude });
      });
    }
  };

  render() {
    // The entire state is passed to the provider
    return (
      <Main>
        <MapViewportContext.Provider
          value={{
            application: this.state.application,
            selectApplication: this.selectApplication,
            viewport: this.state.viewport,
            resetViewport: this.resetViewport
          }}
        >
          <Sidebar />
          <Map />
        </MapViewportContext.Provider>
      </Main>
    );
  }
}

export default App;
