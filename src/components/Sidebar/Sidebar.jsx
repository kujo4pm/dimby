import React, { Component } from 'react';

import { Search } from '../Search';
import { ApplicationInfo } from '../Application';
import { MapViewportContext } from '../Map/MapViewportContext';

import { darkBackground } from '../../styles/colors';

export class Sidebar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div>
          <Search />
        </div>
        <div>
          <ApplicationInfo />
        </div>
        <div>About us</div>
        <div>Data collected by OpenAustralia</div>
      </div>
    );
  }
}

// const ApplicationInfo = props => (
//   <MapViewportContext.Consumer>
//     {(application) => <ApplicationInfo>{application.address}</ApplicationInfo>}
//   </MapViewportContext.Consumer>
// )

const styles = {
  container: {
    background: darkBackground,
    color: '#fff',
    boxShadow: '0px 1px 15px 0px rgba(0,0,0,0.9)',
    zIndex: 10,
    display: 'grid'
  }
};
