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
      validate: [validateEmail, 'Please fill a valid email address'],
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

// Create a virtual property `commentCount` that gets the amount of comments per user
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.username} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
    
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
