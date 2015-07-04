module.exports = {
  development: {
    port: 3001,
    mongo: {
      url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
        'mongodb://localhost/game'
    }
  },
  production: {},
  test: {}
};
