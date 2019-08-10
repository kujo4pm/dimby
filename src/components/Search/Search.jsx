import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';

import { searchForAddresses } from '../../api';
import { MapViewportContext } from '../Map/MapViewportContext';

import {
  secondaryLight,
  secondaryDark,
  primary,
  textOnPrimary,
  primaryLight
} from '../../styles/colors';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getSuggestions = async inputText => {
    const matches = await searchForAddresses({
      q: inputText,
      polygonGeojson: 0
    });
    const suggestions = Array.isArray(matches.data)
      ? matches.data.map(matchData => {
          const { place_id: placeId, display_name: displayName } = matchData;
          return {
            ...matchData,
            value: placeId,
            label: displayName
          };
        })
      : [];
    return suggestions;
  };

  handleSubmit(value) {
    this.setState({ selectedAddress: value });
    const { lat, lon } = value;
    let latitude = 0;
    let longitude = 0;
    try {
      latitude = Number.parseFloat(lat);
      longitude = Number.parseFloat(lon);
      this.props.resetViewport({ latitude, longitude });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <label>
          <AsyncSelect
            placeholder="Search for locations"
            loadOptions={this.getSuggestions}
            onChange={this.handleSubmit}
            styles={customStyles}
          />
        </label>
      </div>
    );
  }
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: primary,
    cursor: 'text',
    height: '50px',
    borderRadius: '0px',
    border: 'none',
    boxShadow: 'inset 0 0 2px #000000',
    borderBottom: state.isFocused ? `1px solid ${secondaryDark}` : 'none',
    '&:hover': {
      border: 'none',
      borderBottom: `1px solid ${secondaryDark}`
    }
  }),
  input: provided => ({
    ...provided,
    color: textOnPrimary
  }),
  indicatorsContainer: provided => ({
    ...provided,
    width: '50px'
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: textOnPrimary,
    width: '46px',
    padding: '0px',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: textOnPrimary
    }
  }),
  singleValue: provided => ({
    ...provided,
    color: textOnPrimary
  }),
  container: provided => ({
    ...provided,
    border: 'none'
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0px',
    background: primary,
    marginTop: '0px'
  }),
  menuList: provided => ({
    ...provided,
    padding: '0px'
  }),
  option: (provided, state) => ({
    ...provided,
    color: textOnPrimary,
    cursor: 'pointer',
    background: state.isFocused && primaryLight,
    borderBottom: state.isFocused && `1px solid ${secondaryLight}`
  })
};

export const Search = props => (
  <MapViewportContext.Consumer>
    {({ resetViewport }) => <SearchBar resetViewport={resetViewport} />}
  </MapViewportContext.Consumer>
);
