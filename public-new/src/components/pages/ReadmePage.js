import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ReadmePage extends Component {
  render() {
    return (
      <div>
        <h2>Further Setup</h2>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
