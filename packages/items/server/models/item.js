'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Item Schema
 */
var ItemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    //required: true,
    trim: true
  },  
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true//,
    //trim: true
  },
  cost: {
    type: Number,
    required: true//,
    //trim: true
  },  
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updated: {
    type: Array
  }
});

/**
 * Validations
 */
ItemSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

ItemSchema.path('description').validate(function(description) {
  return !!description;
}, 'Description cannot be blank');

ItemSchema.path('price').validate(function(price) {
  return !!price;
}, 'Price cannot be blank');

/**
 * Statics
 */
ItemSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Item', ItemSchema);
