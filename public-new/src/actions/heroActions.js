import { HERO_INCREASE_PARAMETER, RECIEVE_HERO, CHANGE_HERO, SAVE_GENERAL_HERO, MESSAGE } from '../constants/AppConstants';

import mediator, { db } from '../mediator';

import heroHelper from '../helpers/heroHelper';

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

function save(hero) {
  return db().child('heroes').child(hero.id).set(hero);
}

export function asyncSaveGeneral(data) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    Object.assign(hero, data);
    save(hero).then(() => { dispatch(saveGeneral(hero)); });
  };
}

export function increaseParameter(name) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero[name]++;
    hero.numberOfParameters--;
    heroHelper.updateFeature(hero);
    save(hero).then(() => { dispatch(change(hero)); });
  };
}

export function increaseAbility(name) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero[name]++;
    hero.numberOfAbilities--;
    heroHelper.updateFeature(hero);
    save(hero).then(() => { dispatch(change(hero)); });
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
    heroHelper.updateFeature(hero);
    save(hero).then(() => { dispatch(change(hero)); });
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
          ref.set(heroHelper.init(hero));
        }

        mediator.loggedInHero = true;

        resolve(hero);
      });
    });
  });
}
