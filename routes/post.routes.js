const controller = require("../controllers/post.controller");

module.exports = function (app) {
  app.post("/api/post/create", controller.create);
  app.get("/api/post/getAll", controller.getAll);
  app.get("/api/post/getOne/:id", controller.getOne);
  app.put("/api/post/update/:id", controller.update);
  app.delete("/api/post/delete/:id", controller.delete);
};
