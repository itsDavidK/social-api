const router = require('express').Router();

const {
    getThought,
    createThought,
    getSingleThought,
    deleteThought,
    addReaction,
    deleteReaction,
    updateThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;