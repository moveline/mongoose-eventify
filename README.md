mongoose-eventify
==================

[Mongoose](https://github.com/LearnBoost/mongoose) plugin adding add, remove, and change events for attributes on Model class.

Install
-------

Add the plugin as a dependency to your project in `package.json`:

```javascript
{
  ...
  "dependencies": {
    "mongoose": ">=3.0.x",
    "mongoose-eventify": ">=0.0.1",
    ...
  },
  ...
}
```

Run `npm install`.

Example
-------

```javascript
// define our move schema and export our model
var MoveSchema = new Schema({
  date: {type: Date},
});
MoveSchema.plugin(require('mongoose-eventify'));
var Move = mongoose.model('Move', MoveSchema);
module.exports = exports = Move;


// now, in a different file, or wherever, we define some change events on the Model
Move.on('change:date', function(move) {
  console.log('Move ' + move._id + ' changed date to + ' move.date);
});

Move.on('add', function(move) {
  console.log('New move created');
});

Move.on('remove', function(move) {
  console.log('Move ' + move._id + ' has been cancelled');
});

Move.on('change', function(move) {
  console.log('Something changed in ' + move._id + '!!');
});
```

Credit
------

Inspired by [mongoose-lifecycle](https://github.com/fzaninotto/mongoose-lifecycle)
Event syntax inspired by [Backbone.js](http://documentcloud.github.com/backbone/)

License
-------

MIT License