export default {
  validationMapper(body) {
    let errors = {};

    for (let key of body.errors) {
      let error = body.errors[key];
      errors[key] = error.message;
    }

    return errors;
  }
};
