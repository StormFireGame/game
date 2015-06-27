import assign from 'object-assign';

import HeroActions from '../actions/hero-actions';
import HeroService from '../services/hero-service';

export default {

  fetch() {
    HeroService.fetch()
      .then((response) => {
        HeroActions.receive(response);
      });
  },

  updateGeneral(data) {
    return HeroService.update(data)
      .then(() => {
        HeroActions.updated(data);
      });
  },

  removeThing(id) {
    return HeroService.removeThing(id)
      .then(() => {
        HeroActions.thingRemoved(id);
      });
  },

  dressThing(id) {
    return HeroService.dressThing(id)
      .then(this.fetch);
  },

  undressThing(id) {
    return HeroService.undressThing(id)
      .then(this.fetch);
  },

  undressThings() {
    return HeroService.undressThings()
      .then(this.fetch);
  },

  newComplect(data) {
    return HeroService.newComplect(data)
      .then((response) => {
        assign(data, response);
        HeroActions.complectCreated(data);
      });
  },

  deleteComplect(id) {
    return HeroService.deleteComplect(id)
      .then(() => {
        HeroActions.complectDeleted(id);
      });
  },

  applyComplect(id) {
    return HeroService.applyComplect(id)
      .then(this.fetch);
  },

  moveOnIsland(x, y) {
    return HeroService.moveOnIsland(x, y)
      .then(() => {
        HeroActions.movedOnIsland(x, y);
      });
  }

};
