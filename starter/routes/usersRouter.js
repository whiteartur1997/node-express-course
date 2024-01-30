const express = require('express');
const {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.route('/').get(getUsers).post(createUser);

usersRouter
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = usersRouter;
