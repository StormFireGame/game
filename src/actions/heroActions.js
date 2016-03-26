import {
  HERO_INCREASE_PARAMETER,
  RECIEVE_HERO,
  CHANGE_HERO,
  SAVE_GENERAL_HERO,
  MESSAGE,
  REMOVE_THING,
  DRESS_OR_UNDRESS_THING,
  UNDRESS_THINGS,
  SAVE_COMPLECT,
  REMOVE_COMPLECT,
  APPLY_COMPLECT,
  MOVE_ON_ISLAND,
} from '../constants/AppConstants';

import mediator, { db } from '../mediator';

import {
  init as heroInit,
  updateFeature,
  thingCanBeDressed,
} from '../helpers/heroHelper';

import uid from 'uid';

function save(hero) {
  return db().child('heroes').child(hero.id).set(hero);
}

function undress(hero) {
  hero.things.forEach(item => {
    item.dressed = false;
  });
  updateFeature(hero);
}

export function moveOnIsland(x, y) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero.location.coordinateX = x;
    hero.location.coordinateY = y;
    save(hero).then(() => dispatch({ type: MOVE_ON_ISLAND, hero }));
  };
}

export function receive(hero) {
  return { type: RECIEVE_HERO, hero };
}

export function change(hero) {
  return { type: CHANGE_HERO, hero };
}

export function saveGeneral(hero) {
  mediator.emit(MESSAGE, 'Hero updated');
  return { type: SAVE_GENERAL_HERO, hero };
}

export function removeThing(hero) {
  mediator.emit(MESSAGE, 'Thing removed');
  return { type: REMOVE_THING, hero };
}

export function saveComplect(name, things) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero.complects.push({ id: uid(), name, things });
    save(hero).then(() => dispatch({ type: SAVE_COMPLECT, hero }));
  };
}
export function removeComplect(id) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero.complects = hero.complects.filter(item => item.id !== id);
    save(hero).then(() => dispatch({ type: REMOVE_COMPLECT, hero }));
  };
}
export function applyComplect(id) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    const { things } = mediator.storage;
    const complect = hero.complects.find(item => item.id === id);
    undress(hero);
    complect.things.forEach(item => {
      const heroThing = hero.things.find(nextItem => nextItem.id === item);
      if (!heroThing) return;
      const thing = things.find(nextItem => nextItem.id === heroThing.thing);
      if (thingCanBeDressed(hero, thing)) {
        heroThing.dressed = true;
      }
    });
    updateFeature(hero);
    save(hero).then(() => dispatch({ type: APPLY_COMPLECT, hero }));
  };
}

export function undressThings() {
  return (dispatch, getState) => {
    const hero = getState().hero;
    undress(hero);
    save(hero).then(() => dispatch({ type: UNDRESS_THINGS, hero }));
  };
}

export function asyncRemoveThing(id) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero.things = hero.things.filter(item => item.id !== id);
    save(hero).then(() => dispatch(removeThing(hero)));
  };
}

export function dressOrUndressThing(id, dress) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    const heroThing = hero.things.find(item => item.id === id);
    heroThing.dressed = dress;
    updateFeature(hero);
    save(hero).then(() => dispatch({ type: DRESS_OR_UNDRESS_THING, hero }));
  };
}

export function asyncSaveGeneral(data) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    Object.assign(hero, data);
    save(hero).then(() => dispatch(saveGeneral(hero)));
  };
}

export function increaseParameter(name) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero[name]++;
    hero.numberOfParameters--;
    updateFeature(hero);
    save(hero).then(() => dispatch(change(hero)));
  };
}

export function increaseAbility(name) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero[name]++;
    hero.numberOfAbilities--;
    updateFeature(hero);
    save(hero).then(() => dispatch(change(hero)));
  };
}

export function increaseSkill(id) {
  return (dispatch, getState) => {
    const hero = getState().hero;

    let heroSkill = hero.skills.find((item) => item.skill === id);

    if (!heroSkill) {
      hero.skills.push({
        skill: id,
        level: 0,
      });
      heroSkill = hero.skills[hero.skills.length - 1];
    }

    heroSkill.level++;

    hero.numberOfSkills--;
    updateFeature(hero);
    save(hero).then(() => dispatch(change(hero)));
  };
}

export function fetch() {
  return new Promise((resolve) => {
    FB.api('/me', {
      fields: 'email,gender,name',
    }, (res) => {
      const ref = db().child('heroes').child(res.id);

      ref.once('value', (data) => {
        let hero = data.val();
        if (!hero) {
          hero = res;
          heroInit(hero);
          ref.set(hero);
        } else {
          // TODO: firebase is [] ignores so we should add
          if (!hero.things) hero.things = [];
          if (!hero.skills) hero.skills = [];
          if (!hero.complects) hero.complects = [];
        }

        mediator.loggedInHero = true;

        resolve(hero);
      });
    });
  });
}
