const { Schema, model } = require('mongoose');

// Schema to create User model
// mongoose.SchemaTypes.String.set('trim', true);
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        trimmed: true, 
        required: true 
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {type: Schema.Types.ObjectId,
        ref: "Thought",
      }
    ],
    friends: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema
  .virtual('friendCount')
  // gets users in friends list
  .get(function () {
    return this.friends.length
  });

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
