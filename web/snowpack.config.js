// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  alias: {
    '~': './src'
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
    polyfillNode: false,
    knownEntrypoints: ['is-extendable', 'entities', 'global']
  },
  devOptions: {
    /* ... */
    openUrl: 'http://localhost:3000'
  },
  buildOptions: {
    /* ... */
  }
};
