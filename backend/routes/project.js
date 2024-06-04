import express from 'express'

import {
  handleAddProject,
  handleGetProject,
  handleGetProjectWithId,
  handleDeleteProjectWithId,
  handleUpdateProjectWithId,
  handleFetchUnallotedProject
} from '../controllers/projects.js'

const router = express.Router()
import { protect, restrictTo } from '../controllers/users.js'


router.route('/unallotted-projects').get(handleFetchUnallotedProject)

router
  .route('/:projectId')
  .get(handleGetProjectWithId)
  .delete(protect, restrictTo('Admin', 'Guide'), handleDeleteProjectWithId)
  .patch(protect, restrictTo('Admin', 'Guide'), handleUpdateProjectWithId)

router
  .route('/')
  .get(handleGetProject)
  .post(protect, restrictTo('Admin', 'Guide'), handleAddProject)

export default router
