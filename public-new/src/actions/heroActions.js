import { HERO_INCREASE_PARAMETER, RECIEVE_HERO, HERO_CHANGED } from '../constants/AppConstants';

import mediator, { db } from '../mediator';

import heroHelper from '../helpers/heroHelper';

export function receive(hero) {
  return { type: RECIEVE_HERO, hero };
}

export function changed(hero) {
  return { type: HERO_CHANGED, hero };
}

function save(hero) {
  return db().child('heroes').child(hero.id).set(hero);
}

export function increaseParameter(name) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero[name]++;
    hero.numberOfParameters--;
    heroHelper.updateFeature(hero);
    save(hero).then(() => { dispatch(changed(hero)); });
  };
}

export function increaseAbility(name) {
  return (dispatch, getState) => {
    const hero = getState().hero;
    hero[name]++;
    hero.numberOfAbilities--;
    heroHelper.updateFeature(hero);
    save(hero).then(() => { dispatch(changed(hero)); });
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
    save(hero).then(() => { dispatch(changed(hero)); });
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
