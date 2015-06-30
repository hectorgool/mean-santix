'use strict';

// The Package is past automatically as first parameter
/*
module.exports = function(Items, app, auth, database) {

  app.get('/items/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/items/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/items/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/items/render', function(req, res, next) {
    Items.render('index', {
      package: 'items'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
*/

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
