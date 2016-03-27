import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Button = (props) => {
  const { className, label, icon, ...otherProps } = props;
  const buttonClassNames = classNames('uk-button', className);

  return (
    <button
      type="button"
      className={buttonClassNames}
      {...otherProps}
    >
      {label}
      {icon ? <i className={`uk-icon-${icon}`} /> : null}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
};

export default Button;
