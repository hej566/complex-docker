import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenNth: [],
    values: {},
    nth: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchNth();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchNth() {
    const seenNth = await axios.get('/api/values/all');
    this.setState({ seenNth: seenNth.data });
  }

  renderSeenNth() {
    return this.state.seenNth
      .map((number) => {
        return number;
      })
      .join(', ');
  }

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div>
          For index {key} I calculated {this.state.values[key]}
        </div>,
      );
    }

    return entries;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', {
      nth: this.state.nth,
    });
    this.setState({ nth: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fib">enter your number</label>
          <input
            id="fib"
            type="text"
            value={this.state.nth}
            onChange={(event) => this.setState({ nth: event.target.value })}
          />
          <button>submit</button>
        </form>
        {this.renderSeenNth()}
        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
