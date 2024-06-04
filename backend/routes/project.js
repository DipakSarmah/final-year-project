import express from 'express'

import {
  handleAddProject,
  handleGetProject,
  handleGetProjectWithId,
  handleDeleteProjectWithId,
  handleUpdateProjectWithId,
  handleFetchUnallotedProject,
  handleAutomaticAllotment,
  handleGetDepartments,
  confirmAllotment,
  fetchProjectAllocation,
} from '../controllers/projects.js'

const router = express.Router()
import { protect, restrictTo } from '../controllers/users.js'

router.route('/automatic-allotment').post(handleAutomaticAllotment)
router.route('/confirm-allotment').post(confirmAllotment)
router.route('/unallotted-projects').get(handleFetchUnallotedProject)
router.route('/departments').get(handleGetDepartments)

router.route('/project-allocation/:teamId').get(fetchProjectAllocation)
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
