import React from 'react';

import debugLib from '../../../lib/debug';
import HeroImageApi from '../../../utils/hero-image-api';
import Form from '../../../components/hero/preferences/images-form';

const debug = debugLib('pages:hero:preferences:images');

export default class HeroPreferencesImagesPage extends React.Component {
  componentDidMount() {
    HeroImageApi.fetch();
  }
  render() {
    debug('render');

    return (
      <div id="hero-preferences-images">
        <h3>Images</h3>
        <Form />
      </div>
    );
  }
}
