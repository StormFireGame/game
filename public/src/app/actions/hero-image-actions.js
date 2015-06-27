import AppDispatcher from '../app-dispatcher';
import HeroImageConstants from '../constants/hero-image-constants';

export default {
  receive(data) {
    AppDispatcher.handleAction({
      actionType: HeroImageConstants.HERO_IMAGES_RECEIVE,
      data: data
    });
  }
};
