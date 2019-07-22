import React, { Component } from 'react';
import ReactMap from 'react-map-gl';
import { fetchAlerts } from '../../api';
import MarkersGroup from './MarkersGroup';
import { MapViewportContext } from './MapViewportContext';
import equal from 'fast-deep-equal';

const { REACT_APP_MAPBOX_API_TOKEN: MAPBOX_API_TOKEN } = process.env;

class MapPane extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    const { intialLocation } = props;
    this.state = {
      viewport: intialLocation,
      mapbounds: {
        bottomLeft: null,
        topRight: null
      },
      popupInfo: {
        closed: true,
        description: null,
        address: null
      },
      markers: [],
      shouldFetchNewMarkers: false,
      wasDragging: false
    };
  }

  static contextType = MapViewportContext;
  getMapBoundaries = () => {
    if (!this.mapRef.getMap) return;
    // Get map boundaries
    const myMap = this.mapRef.getMap();
    return myMap.getBounds();
  };

  updateAlerts = async () => {
    const { data } = await fetchAlerts(this.state.mapbounds);
    this.setState({ markers: data });
  };

  updateViewport = nextViewport => {
    const viewport = {
      ...this.state.viewport,
      ...nextViewport
    };
    const { shouldFetchNewMarkers } = this.state;
    if (!shouldFetchNewMarkers) {
      return this.setState({ viewport });
    }
    const mapBounds = this.getMapBoundaries();
    const { _sw: bottomLeft, _ne: topRight } =
      mapBounds || this.state.mapbounds;
    this.setState(
      {
        viewport,
        mapbounds: {
          topRight,
          bottomLeft
        },
        shouldFetchNewMarkers: false
      },
      () => {
        const { topRight, bottomLeft } = this.state.mapbounds;
        if (bottomLeft && topRight) {
          this.updateAlerts();
        }
      }
    );
  };

  interactionStateChange = interactionState => {
    const { isDragging } = interactionState;
    const newState = { wasDragging: isDragging };
    const { wasDragging } = this.state;
    if (!isDragging && wasDragging) {
      newState.shouldFetchNewMarkers = true;
    }
    this.setState(newState);
  };

  componentDidMount = () => {
    const mapBounds = this.getMapBoundaries();
    this.setState({ mapBounds });
  };

  componentDidUpdate(prevProps) {
    if (!equal(this.props.intialLocation, prevProps.intialLocation)) {
      this.setState({ shouldFetchNewMarkers: true }, () => {
        this.updateViewport(this.props.intialLocation);
      });
    }
  }

  render() {
    const { markers, shouldFetchNewMarkers } = this.state;
    return (
      <ReactMap
        mapboxApiAccessToken={MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        {...this.state.viewport}
        onViewportChange={this.updateViewport}
        onInteractionStateChange={this.interactionStateChange}
        style={styles.map}
        ref={map => (this.mapRef = map)}
      >
        <MarkersGroup markers={markers} shouldUpdate={shouldFetchNewMarkers} />
      </ReactMap>
    );
  }
}

const styles = {
  map: {
    gridColumnStart: 2
  }
};

export const Map = props => (
  <MapViewportContext.Consumer>
    {({ viewport }) => <MapPane intialLocation={viewport} />}
  </MapViewportContext.Consumer>
);
