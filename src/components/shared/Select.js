import React, { Component, PropTypes } from 'react';

export default class extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
    })),
    onChange: PropTypes.func,
  };

  state = {
    value: null,
  };

  onChange(e) {
    const value = e.target.value;
    const { onChange } = this.props;

    this.setState({ value });

    if (onChange) onChange(value);
  }

  render() {
    const { items } = this.props;
    const { value } = this.state;
    const selectedItem = items.find(item => item.key === value);

    return (
      <div className="uk-button uk-form-select">
        <span>{selectedItem ? selectedItem.label : 'Select'}</span>
        {' '}
        <i className="uk-icon-caret-down" />
        <select
          onChange={::this.onChange}
          value={value}
        >
          {!selectedItem ? <option value={''}>Select</option> : null}
          {items.map((item, index) =>
            <option key={index} value={item.key}>
              {item.label}
            </option>
          )}
        </select>
      </div>
    );
  }
}
