// Import functions/dependencies from the controllers //
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// GET and POST users @ /api/users //
router.route('/').get(getUsers).post(createSingleUser);

// GET, PUT, DELETE a single user @ /api/users/:userId //
router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

// POST and DELETE a single friend @ /api/users/:userId/friends/:friendId //
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
