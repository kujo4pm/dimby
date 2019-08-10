import React, { Component } from 'react';
import { MapViewportContext } from '../Map/MapViewportContext';

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
      <div style={customStyles.container}>
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

const customStyles = {
  container: {
    margin: '10px',
    display: 'flex'
  }
};

export const ApplicationInfo = props => (
  <MapViewportContext.Consumer>
    {({ application }) => <Application application={application} />}
  </MapViewportContext.Consumer>
);
