import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';

import PlanningPin from './PlanningPin';
import { MapViewportContext } from './MapViewportContext';

class MarkersGroup extends React.PureComponent {
  static contextType = MapViewportContext;

  render() {
    const { markers } = this.props;
    return markers.map(marker => {
      const { id, lng, lat } = marker.application;

      return (
        <Marker longitude={lng} latitude={lat} key={id}>
          <PlanningPin
            transformPosition
            onClick={() => this.context.selectApplication(marker.application)}
          />
        </Marker>
      );
    });
  }
}

MarkersGroup.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      lng: PropTypes.string,
      lat: PropTypes.string
    })
  )
};

export default MarkersGroup;
