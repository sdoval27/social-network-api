const router = require('express').Router();

//don't forget to push the created thought's _id to the associated user's thoughts array field

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/courseController.js');

// /api/courses
//GET to get all thoughts
//POST to create a new thought 
router.route('/').get(getThoughts).post(createThought);

// /api/courses/:courseId

//GET to get a single thought by its _id
//PUT to update a thought by its _id
//DELETE to remove a thought by its _id
router
  .route('/:courseId')
  .get( getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;