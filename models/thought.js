const { Schema, model, Types } = require('mongoose');
const dateStyle = require('../utils/dateStyle');
// Schema to create User model
const reactionSchema = new Schema(
    {
        reactionId: {
            type:Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            maxlength: 280,
        },
        username: {
            type: String, 
            require: true,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (timestamp) => dateStyle(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
        versionKey: false,
    }
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type:String, 
        require: true,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateStyle(createdAtVal),
    },
    username: {
        type: String, 
        require: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    versionKey: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;