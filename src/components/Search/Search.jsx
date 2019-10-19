import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';

import { searchForAddresses } from '../../api';
import { MapViewportContext } from '../Map/MapViewportContext';
import { LoadingIcon } from '../common';

import {
  secondaryLight,
  secondaryDark,
  primary,
  textOnPrimary,
  primaryLight
} from '../../styles/colors';

const Container = styled.div`
  height: 50px;
`;

const LoadingIndicator = props => {
  const {
    children = <LoadingIcon />,
    innerProps: { ref, ...restInnerProps }
  } = props;

  return (
    <div {...restInnerProps} ref={ref}>
      {children}
    </div>
  );
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: null
    };
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

  handleSubmit = value => {
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
  };

  render() {
    const { updateSearchStatus } = this.props;

    return (
      <Container>
        <label>
          <AsyncSelect
            ref={this.searchRef}
            placeholder="Search for locations"
            components={{ LoadingIndicator }}
            loadOptions={this.getSuggestions}
            onChange={this.handleSubmit}
            onMenuOpen={() => updateSearchStatus(true)}
            onMenuClose={() => updateSearchStatus(false)}
            styles={customStyles}
          />
        </label>
      </Container>
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
    width: '50px',
    marginLeft: 10
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: textOnPrimary,
    width: '46px',
    padding: '0px',
    justifyContent: 'center',
    cursor: 'pointer',
    visibility: state.selectProps.isLoading && 'hidden',
    '&:hover': {
      color: textOnPrimary
    }
  }),
  loadingIndicator: provided => ({
    ...provided,
    div: {
      color: textOnPrimary,
      background: textOnPrimary
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
    {({ resetViewport, updateSearchStatus }) => (
      <SearchBar
        updateSearchStatus={updateSearchStatus}
        resetViewport={resetViewport}
      />
    )}
  </MapViewportContext.Consumer>
);
