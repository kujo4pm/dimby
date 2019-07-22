import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { searchForAddresses } from '../../api';

export class Search extends Component {
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
