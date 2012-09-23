//  (c) 2012 Moveline
//  MIT Licensed

// Eventify
// -----
// git@github.com:Moveline/mongoose-eventify.git

// Mongoose plugin adding add, remove, and change events for attributes on Model class
var _ = require('underscore');

module.exports = exports = function events(schema, options) {
  schema.pre('save', function (next) {
    this._changed = this.modifiedPaths();
    this._isNew = this.isNew;
    next();
  });

  schema.post('save', function() {
    var model = this.model(this.constructor.modelName);
    if(this._changed) {
      model.emit('change', this);

      var self = this;
      var eventKeys = {};
      _.each(this._changed, function(attribute) {
        var key = 'change:' + attribute;
        if (typeof eventKeys[key] === 'undefined') {
          model.emit(key, self);
          eventKeys[key] = key;
        }
      });
      delete this._changed;
    }
    if (this._isNew) {
      model.emit('add', this);
      delete this._isNew;
    }
  });

  schema.post('remove', function() {
    var model = this.model(this.constructor.modelName);
    model.emit('remove', this);
  });
}
