import React from 'react';
import styled from 'styled-components';

import { Map, MapViewportContext, LoadingMap } from './components/Map';
import {
  getDefaultViewport,
  defaultApplication
} from './components/Map/MapViewportContext';
import { Sidebar } from './components/Sidebar';
import { TabletFooter } from './components/TabletFooter';
import { BREAKPOINTS } from './styles/constants';
import { Search } from './components/Search';
import { FilterDropdown, TabletFilterDropdown } from './components/Filters';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  height: ${window.innerHeight}px;
`;

const TabletLayout = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: 100%;
  height: ${window.innerHeight}px;
  position: relative;
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

    const currentDate = new Date();
    const oneMonthAgo = new Date(
      Date(currentDate.setMonth(currentDate.getMonth() - 1))
    );

    window.onresize = this.updateWindowSize;

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      viewport: getDefaultViewport(),
      application: defaultApplication,
      isSearchOpen: false,
      applicationFilters: {
        dateRange: [currentDate, oneMonthAgo]
      },
      clientWidth: document.documentElement.clientWidth
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

  updateSearchStatus = status => {
    this.setState({ isSearchOpen: status });
  };

  updateApplicationFilters = newFilter => {
    this.setState(currentState => {
      return {
        applicationFilters: { ...currentState.applicationFilters, ...newFilter }
      };
    });
  };

  updateWindowSize = () => {
    const widthOutput = document.documentElement.clientWidth;

    this.setState({ clientWidth: widthOutput });
  };

  render() {
    if (this.state.clientWidth < BREAKPOINTS.md) {
      return (
        <TabletLayout>
          <MapViewportContext.Provider
            value={{
              application: this.state.application,
              selectApplication: this.selectApplication,
              viewport: this.state.viewport,
              resetViewport: this.resetViewport,
              updateSearchStatus: this.updateSearchStatus,
              isSearchOpen: this.state.isSearchOpen,
              updateApplicationFilters: this.updateApplicationFilters,
              applicationFilters: this.state.applicationFilters
            }}
          >
            <div>
              <Search />
              <TabletFilterDropdown />
            </div>
            <Map />
            <TabletFooter />
            <LoadingMap center />
          </MapViewportContext.Provider>
        </TabletLayout>
      );
    }

    return (
      <Layout>
        <MapViewportContext.Provider
          value={{
            application: this.state.application,
            selectApplication: this.selectApplication,
            viewport: this.state.viewport,
            resetViewport: this.resetViewport,
            updateSearchStatus: this.updateSearchStatus,
            isSearchOpen: this.state.isSearchOpen,
            updateApplicationFilters: this.updateApplicationFilters,
            applicationFilters: this.state.applicationFilters
          }}
        >
          <Sidebar />
          <FilterDropdown />
          <Map />
          <LoadingMap />
        </MapViewportContext.Provider>
      </Layout>
    );
  }
}

export default App;
