import express from 'express'
import {
  handleAddStudent,
  handleGetStudent,
  handleGetStudentWithId,
  handleDeleteStudentWithId,
  handleUpdateStudentWithId,
  handleGetBatchMates,
  handleAddNotificationStudentTeammate,
  handleAddNewTeam,
  handleGetAllTeamRequest,
  handleAddNewMemberToTeam,
  handleDeleteNotificationTeamRequest,
  handleFetchTeammates,
  handleAddTeamPreference,
  handleGetAppointmentForTeam,
} from '../controllers/students.js'

import { protect, restrictTo } from '../controllers/users.js'
//   /api/student/
const router = express.Router()

router
  .route('/batchmates')
  .get(handleGetBatchMates)
  .post(handleAddNotificationStudentTeammate)
  .delete(handleDeleteNotificationTeamRequest)

router.route('/preference').post(handleAddTeamPreference)

router
  .route('/team')
  .get(handleFetchTeammates)
  .post(handleAddNewTeam)
  .patch(handleAddNewMemberToTeam)

router.route('/teamRequest').get(handleGetAllTeamRequest)
router.route('/appointment/:teamId').get(handleGetAppointmentForTeam)
router
  .route('/:id')
  .get(protect, handleGetStudentWithId)
  .delete(protect, restrictTo('Admin', 'Guide'), handleDeleteStudentWithId)
  .patch(protect, restrictTo('Admin', 'Guide'), handleUpdateStudentWithId)

router
  .route('/')
  .get(handleGetStudent)
  .post(protect, restrictTo('Admin', 'Guide'), handleAddStudent)

export default router
