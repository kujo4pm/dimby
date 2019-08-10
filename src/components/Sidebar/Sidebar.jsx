import React, { Component } from 'react';

import { Search } from '../Search';
import { ApplicationInfo } from '../Application';

import { primaryDark } from '../../styles/colors';

export class Sidebar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Search />
        <ApplicationInfo />
        <div>Data collected by OpenAustralia</div>
      </div>
    );
  }
}

const styles = {
  container: {
    background: primaryDark,
    color: '#fff',
    boxShadow: '0px 1px 15px 0px rgba(0,0,0,0.9)',
    zIndex: 10,
    display: 'grid'
  }
};
