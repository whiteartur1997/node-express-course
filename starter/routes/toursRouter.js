const express = require('express');
const {
  getTourById,
  deleteTourById,
  updateTourById,
  createTour,
  getTours,
  getTourStats,
  aliasTopTours,
  getToursMonthlyPlan,
} = require('../controllers/toursController');

const toursRouter = express.Router();

toursRouter.route('/top-5-tours').get(aliasTopTours, getTours);
toursRouter.route('/stats').get(getTourStats);
toursRouter.route('/monthly-plan/:year').get(getToursMonthlyPlan);

toursRouter.route('/').get(getTours).post(createTour);

toursRouter
  .route('/:id')
  .get(getTourById)
  .delete(deleteTourById)
  .patch(updateTourById);

module.exports = toursRouter;
