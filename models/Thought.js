const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
// mongoose.SchemaTypes.String.set('trim', true);
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: 'You need to leave a thought', 
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true,
      },
    reactions: [reactionSchema]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  // gets users in friends list
  .get(function () {
    return this.reactions.length
  });

// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
