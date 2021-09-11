// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  alias: {
    "~": "./src"
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
    knownEntrypoints: ["is-extendable"]
  },
  devOptions: {
    /* ... */
    openUrl: "http://localhost:3000"
  },
  buildOptions: {
    /* ... */
  }
};
