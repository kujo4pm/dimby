import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

const { REACT_APP_MAPBOX_API_TOKEN: MAPBOX_API_TOKEN } = process.env;
class Map extends Component {
    constructor(props) {
        super(props);
        this.mapRef= React.createRef();
    }
  state = {
    viewport: {
      width: 800,
      height: 600,
      latitude: -37.754070,
      longitude: 145.001230,
      zoom: 12
    }
  };
  getMapBoundaries = () => {
    if (!this.mapRef.getMap) return;
    // Get map boundaries
    const myMap = this.mapRef.getMap(); 
    return myMap.getBounds();
  }

  updateViewport = (viewport) => {
    const mapBounds = this.getMapBoundaries();
    this.setState({ viewport, mapBounds });
  };

  componentDidMount = () => {
    const mapBounds = this.getMapBoundaries();
    this.setState({ mapBounds });
  };
  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_API_TOKEN}
        {...this.state.viewport}
        onViewportChange={this.updateViewport}
        ref={map => this.mapRef = map}
      />
    );
  }
}

export default Map;