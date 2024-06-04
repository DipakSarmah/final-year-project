import express from 'express'
import {
  handleAddProjectGuide,
  handleGetProjectGuides,
  handleDeleteProjectGuide,
  handleEditProjectGuide,
  handleGetProjectGuideWithId,
  handleGetTeamUnderGuideId,
  fetchResourcesByTeamAndGuide,
} from '../controllers/projectGuide.js'

import {
  handleAddscheduleAppointment,
  HandleGetListOfPointment,
  handleGetAppointmentWithGuideId,

} from './../controllers/appointment.js'

import { protect, restrictTo } from '../controllers/users.js'

const router = express.Router()

router.route('/resources/:teamId/:guideId').get(fetchResourcesByTeamAndGuide)
router.route('/appointment/:guideId').get(handleGetAppointmentWithGuideId)
router
  .route('/appointment')
  .get(HandleGetListOfPointment)
  .post(handleAddscheduleAppointment)

router
  .route('/:id')
  .get(protect, restrictTo('Admin', 'Guide'), handleGetProjectGuideWithId)
  .patch(protect, restrictTo('Admin'), handleEditProjectGuide)
  .delete(protect, restrictTo('Admin'), handleDeleteProjectGuide)


router
  .route('/:guideId/teams')
  .get(protect, restrictTo('Admin', 'Guide'), handleGetTeamUnderGuideId)
router
  .route('/')
  .get(protect, restrictTo('Admin'), handleGetProjectGuides)
  .post(protect, restrictTo('Admin'), handleAddProjectGuide)

// router
//   .route('/:id')
//   .delete(protect, restrictTo('Admin'), handleDeleteProjectGuide)
export default router
