const { User, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    }, 

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            });
    },
 
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Tag created, but no post with that ID' })
                    : res.json('Tag created')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true},
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({message: 'No thought found with that ID'})
                :res.json(thought)
        }).catch((err) => {
                    console.log(err);
                    res.status(500).json(err)
                });
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID' })
                : User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $pull: { thoughts: thought._id } },
                    { new: true },
                ).then(() => {
                    res.json({ message: 'Thought deleted' });
                }).catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        })
    },

//REACTION PORTION

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true}
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID' })
                : res.json(thought)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true}
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID' })
                : res.json(thought)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}