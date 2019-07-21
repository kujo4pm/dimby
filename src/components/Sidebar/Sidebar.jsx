import React, { Component } from 'react';

import { darkBackground } from '../../styles/colors';

export class Sidebar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div>Search</div>
        <div>Currently selected application information</div>
        <div>About us</div>
        <div>Data collected by OpenAustralia</div>
      </div>
    );
  }
}

const styles = {
  container: {
    background: darkBackground,
    color: '#fff',
    boxShadow: '0px 1px 15px 0px rgba(0,0,0,0.9)',
    zIndex: 10,
    display: 'grid'
  }
};
