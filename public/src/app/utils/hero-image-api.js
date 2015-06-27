import HeroImageActions from '../actions/hero-image-actions';
import HeroImageService from '../services/hero-image-service';

export default {

  fetch() {
    HeroImageService.fetch()
      .then((response) => {
        HeroImageActions.receive(response);
      });
  }

};
