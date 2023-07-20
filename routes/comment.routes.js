const controller = require("../controllers/comment.controller");

module.exports = function (app) {
  app.post("/api/comment/create", controller.create);
  app.get("/api/comment/getAll", controller.getAll);
  app.get("/api/comment/getOne/:id", controller.getOne);
  app.put("/api/comment/update/:id", controller.update);
  app.delete("/api/comment/delete/:id", controller.delete);
};