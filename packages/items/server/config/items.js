'use strict';

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.item.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Items, app, auth) {
  
  var items = require('../controllers/items')(Items);

  app.route('/api/items')
    .get(items.all)
    .post(auth.requiresLogin, items.create);
  app.route('/api/items/:itemId')
    .get(auth.isMongoId, items.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, items.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, items.destroy);

  // Finish with setting up the itemId param
  app.param('itemId', items.item);
  
};
