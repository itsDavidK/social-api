const {Schema, model} = require('mongoose');

// Schema to create User model

var validateEmail = function(email) {
  var check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return check.test(email);
}

const userSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      //check if valid email
      validate: [validateEmail, "Enter a valid email."],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/] 
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
    versionKey: false,
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length
})

const User = model('user', userSchema)

module.exports = User;