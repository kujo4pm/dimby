import React, { Component } from 'react';
import { searchForAddresses } from '../../api';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      loading: false,
      suggestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ searchText: value, loading: true }, async () => {
      const matches = await searchForAddresses({
        q: this.state.searchText,
        polygonGeojson: 0
      });
      const suggestions = Array.isArray(matches.data)
        ? matches.data.map(matchData => {
            const { place_id: placeId, display_name: displayName } = matchData;
            return { placeId, displayName };
          })
        : [];
      this.setState({ loading: false, suggestions });
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form style={styles.container}>
        <label>
          Search:
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleChange}
          />
        </label>
      </form>
    );
  }
}

const styles = {
  container: {}
};
