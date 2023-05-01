const router = require('express').Router();

//don't forget to push the created thought's _id to the associated user's thoughts array field

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

// /api/courses
//GET to get all thoughts
//POST to create a new thought 
router.route('/').get(getThoughts).post(createThought);

// /api/courses/:courseId

//GET to get a single thought by its _id
//PUT to update a thought by its _id
//DELETE to remove a thought by its _id
router
  .route('/:thoughtId')
  .get( getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/students/:studentId/assignments
router.route('/:thoughtId/reactions').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;