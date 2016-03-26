import React, { Component } from 'react';
import { Link } from 'react-router';

export default class extends Component {
  render() {
    return (
      <article>
        <h1>Page not found.</h1>
        <Link to="/">Home</Link>
      </article>
    );
  }
}
