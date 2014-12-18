var React = require('react');

var RadioButtonGroup = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },
  _onClick: function(val){
    this.setValue(val);
    if (this.props.onChange) this.props.onChange(val);
  },
  componentDidMount: function() {
    var defaultValue;
    for (var key in this.props.children) {
      var child = this.props.children[key];
      if (child.props.defaultChecked === 'true') {
        defaultValue = child.props.value;
        break;
      }
    }
    if (defaultValue) this.setValue(defaultValue);
  },
  setValue: function(value) {
    this.setState({
      selected: value
    });
  },
  getValue: function(){
    return this.state.selected;
  },
  render: function(){
    var children = this.props.children.map(function(child) {
      child.props.onClick = this._onClick.bind(this, child.props.value);
      return child;
    },this);

    return (
      <div className="mui-radio-button-group mui-radio-button-group--vertical">
        {children}
      </div>
    )
  }
});

module.exports = RadioButtonGroup;
