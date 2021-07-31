module.exports = {
  client: {
    service: "vical2021",
    url: "http://localhost:4000/graphql",
  },
  service: {
    endpoint: {
      skipSSLValidation: true, // optional, disables SSL validation check
    },
  },
};
