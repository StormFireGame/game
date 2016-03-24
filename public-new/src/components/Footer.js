import React from 'react';

export default class extends React.Component {
  getStyles() {
    return {
      base: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        height: 48,
        width: '100%',
        textAlign: 'center',
        background: '#212121',
      },
    };
  }
  render() {
    return (
      <div style={this.getStyles().base}>
        <a
          style={{ marginTop: 7 }}
          className="uk-icon-hover uk-icon-github uk-icon-large"
          href="https://github.com/DragonLegend/game"
        />
        <a
          className="
            uk-margin-small-left
            uk-icon-hover uk-icon-justify uk-icon-comments uk-icon-large"
          href="https://discord.gg/0u7tUFrvj1hE0QY5"
        />
      </div>
    );
  }
}
