import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { searchForAddresses } from '../../api';
import { MapViewportContext } from '../Map/MapViewportContext';

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
          Search:
          <AsyncSelect
            placeholder="Search for address"
            loadOptions={this.getSuggestions}
            onChange={this.handleSubmit}
          />
        </label>
      </div>
    );
  }
}

const styles = {
  container: {}
};

export const Search = props => (
  <MapViewportContext.Consumer>
    {({ resetViewport }) => <SearchBar resetViewport={resetViewport} />}
  </MapViewportContext.Consumer>
);
