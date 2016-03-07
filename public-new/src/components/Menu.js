import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames';

export default class extends Component {
  static contextTypes = {
    router: PropTypes.func.isRequired,
  };
  render() {
    const { router } = this.context;

    return (
      <nav className="uk-navbar" style={{ marginTop: 17 }}>
        <ul className="uk-navbar-nav">
          <li className={classNames({ 'uk-active': router.isActive('/') })}>
            <Link to="/">Hero</Link>
          </li>
          <li>
            <Link to="/hero/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/hero/preferences">Preferences</Link>
          </li>
        </ul>
        <div className="uk-navbar-flip">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/">Back</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
