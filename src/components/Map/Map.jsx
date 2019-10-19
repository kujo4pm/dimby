import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMap from 'react-map-gl';
import equal from 'fast-deep-equal';

import { fetchAlerts } from '../../api';
import MarkersGroup from './MarkersGroup';
import { LoadingMap } from '.';
import { MapViewportContext } from './MapViewportContext';

const { REACT_APP_MAPBOX_API_TOKEN: MAPBOX_API_TOKEN } = process.env;
const MIN_ZOOM = 12;
const noop = () => {};

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
      wasInteracting: false,
      loading: false
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
    LoadingMap.show();
    const { data } = await fetchAlerts(this.state.mapbounds);
    LoadingMap.hide();
    this.setState({
      markers: data
    });
  };

  /* 
    params interactionState & oldViewState needed for compatibility 
    with onViewportChange.
    see: https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=callbacks
  */
  updateViewport = (
    nextViewport,
    interactionState,
    oldViewState,
    onComplete = noop
  ) => {
    const viewport = {
      ...this.state.viewport,
      ...nextViewport
    };
    this.setState({ viewport }, () => {
      const mapBounds = this.getMapBoundaries();
      const { _sw: bottomLeft, _ne: topRight } =
        mapBounds || this.state.mapbounds;
      this.setState(
        {
          mapbounds: {
            topRight,
            bottomLeft
          }
        },
        () => onComplete()
      );
    });
  };

  interactionStateChange = interactionState => {
    // here we are trying to capture the idea that the user WAS interacting
    // with the map (no matter HOW) but then stopped - so fetch alerts
    const { isDragging, isPanning, isRotating, isZooming } = interactionState;
    const isInteracting = isDragging || isPanning || isRotating || isZooming;
    const { wasInteracting } = this.state;
    if (wasInteracting && !isInteracting) {
      this.updateAlerts();
    }
    const newState = {
      wasInteracting: isInteracting
    };
    this.setState(newState);
  };

  componentDidMount = () => {
    this.updateViewport(this.props.intialLocation, {}, {}, this.updateAlerts);
  };

  componentDidUpdate(prevProps) {
    if (!equal(this.props.intialLocation, prevProps.intialLocation)) {
      this.updateViewport(this.props.intialLocation, {}, {}, this.updateAlerts);
    }
  }
  render() {
    const { markers } = this.state;
    return (
      <ReactMap
        mapboxApiAccessToken={MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        {...this.state.viewport}
        onViewportChange={this.updateViewport}
        onInteractionStateChange={this.interactionStateChange}
        style={{ gridColumnStart: 2 }}
        minZoom={MIN_ZOOM}
        ref={map => (this.mapRef = map)}
      >
        <MarkersGroup markers={markers} />
      </ReactMap>
    );
  }
}

MapPane.propTypes = {
  intialLocation: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number
  })
};

MapPane.defaultProps = {
  intialLocation: {}
};

export const Map = props => (
  <MapViewportContext.Consumer>
    {({ viewport }) => <MapPane intialLocation={viewport} />}
  </MapViewportContext.Consumer>
);
