const {Thought} = require('../models');
const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        Thought.deleteMany({
          _id: {$in: user.thoughts}
        }).then(() => {
          res.json({ message: 'User deleted' })
        }).catch((err) => {
          res.status(500).json(err)
        });
      })
  },

  addfriends(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404)
          .json({ message: 'No user found with that ID' })
        : res.json(user)
    ).catch((err) => {
      console.log(err);
      res.status(500).json(err)
    })
  },

  deletefriends(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.json(user)
      }).catch((err) => {
        res.status(500).json(err)
      })
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) => {
      !user
        ? res.status(404).json({ message: 'No user found with that ID' })
        : res.json(user)
    }).catch((err) => {
      res.status(500).json(err)
    })
  },
};