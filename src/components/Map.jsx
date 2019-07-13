import React, { Component } from 'react';
import ReactMap from 'react-map-gl';
import { fetchAlerts } from '../api';
import MarkersGroup from './MarkersGroup';

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
    },
    mapbounds: {
      bottomLeft: null,
      topRight: null,
    },
    popupInfo: {
      closed: true,
      description: null,
      address: null,
    },
    markers: [],
    shouldFetchNewMarkers: false,
    wasDragging: false,
  };
  getMapBoundaries = () => {
    if (!this.mapRef.getMap) return;
    // Get map boundaries
    const myMap = this.mapRef.getMap(); 
    return myMap.getBounds();
  }

  updateAlerts = async  () => {
    const { data } = await fetchAlerts(this.state.mapbounds);
    this.setState({ markers: data });
  };

  updateViewport = (viewport) => {
    const { shouldFetchNewMarkers } = this.state;
    if (!shouldFetchNewMarkers) {
      return this.setState({ viewport });
    }
    const mapBounds = this.getMapBoundaries();
    const { _sw: bottomLeft, _ne: topRight } = mapBounds || this.state.mapbounds;
    this.setState({
      viewport,
      mapbounds: {
        topRight,
        bottomLeft,
      },
      shouldFetchNewMarkers: false,
    });
    if (bottomLeft && topRight) {
      return this.updateAlerts();
    }
  };

  interactionStateChange = (interactionState) => {
    const { isDragging } = interactionState;
    const newState = { wasDragging: isDragging };
    const { wasDragging } = this.state;
    if (!isDragging && wasDragging) {
      newState.shouldFetchNewMarkers = true;
    }
    this.setState(newState);
  }

  componentDidMount = () => {
    const mapBounds = this.getMapBoundaries();
    this.setState({ mapBounds });
  };

  render() {
    const { markers, shouldFetchNewMarkers } = this.state;
    return (
      <ReactMap
        mapboxApiAccessToken={MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        {...this.state.viewport}
        onViewportChange ={this.updateViewport}
        onInteractionStateChange={this.interactionStateChange}
        ref={map => this.mapRef = map}
      >
        <MarkersGroup
          markers={markers}
          shouldUpdate={shouldFetchNewMarkers}
        />
      </ReactMap>
    );
  }
}

export default Map;