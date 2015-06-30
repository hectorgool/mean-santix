'use strict';

// The Package is past automatically as first parameter
module.exports = function(Tmp, app, auth, database) {

  app.get('/tmp/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/tmp/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/tmp/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/tmp/example/render', function(req, res, next) {
    Tmp.render('index', {
      package: 'tmp'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
