import React from 'react';
import { Marker } from 'react-map-gl';

import PlanningPin from './PlanningPin';
import { MapViewportContext } from './MapViewportContext';

class MarkersGroup extends React.PureComponent {
  static contextType = MapViewportContext;

  render() {
    const { markers } = this.props;
    return markers.map(marker => {
      const {
        id,
        lng,
        lat,
        description,
        address,
        dateReceived: date_received,
        dateScraped: date_scraped
      } = marker.application;

      return (
        <Marker longitude={lng} latitude={lat} key={id}>
          <PlanningPin
            onClick={() => this.context.selectApplication(marker.application)}
          />
        </Marker>
      );
    });
  }
}
export default MarkersGroup;
