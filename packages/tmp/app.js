'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Tmp = new Module('tmp');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Tmp.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Tmp.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Tmp.menus.add({
    title: 'tmp example page',
    link: 'tmp example page',
    roles: ['authenticated'],
    menu: 'main'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Tmp.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Tmp.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Tmp.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Tmp;
});
