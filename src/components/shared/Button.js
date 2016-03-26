import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class extends Component {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
  };

  render() {
    const { className, label, icon, ...props } = this.props;
    const buttonClassNames = classNames('uk-button', className);

    return (
      <button
        type="button"
        className={buttonClassNames}
        {...props}
      >
        {label ? label : null}
        {icon ? <i className={`uk-icon-${icon}`} /> : null}
      </button>
    );
  }
}
