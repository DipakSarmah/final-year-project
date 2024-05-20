import express from 'express'
import { handleAddProjectGuide } from '../controllers/projectGuide.js'

const router = express.Router()

router.route('/').post(handleAddProjectGuide)

export default router
