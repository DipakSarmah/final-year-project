import express from 'express'
import {
  handleGetAllTeam,
  getTeamMembers,
  handleDeleteTeam,
} from '../controllers/teamcontroller.js'
import { protect, restrictTo } from '../controllers/users.js'

const router = express.Router()

router.route('/teams/:teamId/members').get(getTeamMembers)
router
  .route('/teams/:teamId')
  .delete(protect, restrictTo('Admin'), handleDeleteTeam)
router.route('/teams').get(handleGetAllTeam)

export default router
