const controller = require('../controllers/test.controller');

module.exports = function(app) {
    app.get('/api/:id', controller.firstController)
}

module.exports = function(app) {
    app.get('/api/test', controller.secondController)
}