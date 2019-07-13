import React from 'react';
import { Marker } from 'react-map-gl';
import PlanningPin from './PlanningPin';
class MarkersGroup extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { markers } = this.props;
    return markers.map(marker => {
      const { id, lng, lat, description, address, dateReceived: date_received, dateScraped: date_scraped } = marker.application;
      return (
        <Marker longitude={lng} latitude={lat} key={id} >
          <PlanningPin />
        </Marker>
      );
    })
}
}
export default MarkersGroup;