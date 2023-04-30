const { Schema, model } = require('mongoose');

// Schema to create User model
// mongoose.SchemaTypes.String.set('trim', true);
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
        type: String,
        required: true,
      },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
//reaction is not a model, this is the reaction field's subdocument schema nested in the thought model

module.exports = reactionSchema;
