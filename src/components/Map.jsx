import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

const { REACT_APP_MAPBOX_API_TOKEN: MAPBOX_API_TOKEN } = process.env;
class Map extends Component {

  state = {
    viewport: {
      width: 800,
      height: 600,
      latitude: -37.754070,
      longitude: 145.001230,
      zoom: 12
    }
  };

  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_API_TOKEN}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default Map;