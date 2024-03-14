// Import functions/dependencies from the controllers //
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateSingleThought,
  deleteSingleThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// GET and POST thoughts @ /api/thoughts //
router.route('/').get(getThoughts).post(createThought);

// GET, PUT, DELETE a single thought @ /api/thoughts/:thoughtId //
router.route('/:thoughtId').get(getSingleThought).put(updateSingleThought).delete(deleteSingleThought);

// POST single reaction @ /api/thoughts/:thoughtId/reactions //
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE a single reaction @ /api/thoughts/:thoughtId/reactions/:reactionId //
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
