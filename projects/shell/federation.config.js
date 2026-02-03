const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'shell',

  remotes: {
    'mfe-products': 'http://localhost:4201/remoteEntry.json',
    "mfe-cart": "http://localhost:4202/remoteEntry.json",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },

  features: {
    ignoreUnusedDeps: true,
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
});
