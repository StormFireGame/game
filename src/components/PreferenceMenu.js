import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class extends Component {
  static contextTypes = {
    router: PropTypes.func.isRequired,
  };

  render() {
    const { router } = this.context;

    const items = [{
      label: 'General',
      path: '/preferences/general',
    }, {
      label: 'Images',
      path: '/preferences/images',
    }];

    return (
      <ul className="uk-nav uk-nav-side">
        {items.map((item) => (
          <li className={classNames({ 'uk-active': router.isActive(item.path) })}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    );
  }
}
