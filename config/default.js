module.exports = {
  basePath: {
    ui: "/bear",
    api: "/api"
  },

  jwt: {
    secret: "meow",
    expires: {
      view: 604800, // 7d
      edit: 900 // 15min
    }
  }
};
