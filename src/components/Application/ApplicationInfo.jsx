import React, { Component } from 'react';
import { MapViewportContext } from '../Map/MapViewportContext';

// {
//   "id": 1344250,
//   "council_reference": "PVN19/0087",
//   "date_scraped": "2019-07-31T02:00:53.000Z",
//   "address": "57 Yarra Valley Boulevard Bulleen VIC 3105",
//   "description": "Construction of a verandah",
//   "info_url": "https://eproclaim.manningham.vic.gov.au/eProperty/P1/eTrack/eTrackApplicationDetails.aspx?ApplicationId=PVN19%2F0087&f=%24P1.ETR.APPDET.VIW&r=P1.WEBGUEST",
//   "comment_url": null,
//   "date_received": "2019-07-28",
//   "on_notice_from": null,
//   "on_notice_to": null,
//   "lat": -37.7602017,
//   "lng": 145.0884293,
//   "authority": {
//     "full_name": "Manningham City Council"
//   }
// }

class Application extends Component {
  render() {
    const {
      defaultText,
      council_reference,
      address,
      description,
      info_url,
      date_received
    } = this.props.application;

    return (
      <div>
        {defaultText && <h3>{defaultText}</h3>}

        {council_reference && (
          <div>
            <h4>Reference:</h4>
            <p>{council_reference}</p>
          </div>
        )}

        {address && (
          <div>
            <h4>Address:</h4>
            <p>{address}</p>
          </div>
        )}

        {description && (
          <div>
            <h4>Application description:</h4>
            <p>{description}</p>
          </div>
        )}

        {date_received && (
          <div>
            <h4>Date received:</h4>
            <p>{date_received}</p>
          </div>
        )}

        {info_url && (
          <div>
            <h4>Info url:</h4>
            <p>{info_url}</p>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  container: {}
};

export const ApplicationInfo = props => (
  <MapViewportContext.Consumer>
    {({ application }) => <Application application={application} />}
  </MapViewportContext.Consumer>
);
