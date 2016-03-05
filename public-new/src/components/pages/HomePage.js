import { asyncChangeProjectName } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class HomePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { projectName } = this.props.data;
    return (
      <div>
        <h1>Hello World!</h1>
        <h2>This is the demo for the { projectName }</h2>
        <label>Change to your project name:
          <input
            type="text"
            onChange={(evt) => { dispatch(asyncChangeProjectName(evt.target.value)); }}
            defaultValue="React.js Boilerplate"
            value={projectName} />
        </label>
        <Link to="/readme">Setup</Link>
      </div>
    );
  }
}

function select(state) {
  return {
    data: state,
  };
}

export default connect(select)(HomePage);
