import mediator from '../mediator';

export default {
  isSignin() {
    return mediator.accessToken !== null;
  }
};
