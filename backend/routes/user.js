import express from 'express'
import { handleRegistration } from '../controllers/users.js'
import { check } from 'express-validator'

const router = express.Router()

router.post(
  '/register',
  [
    check('userId', 'User id is required').isString(),
    check('role', 'Role is required').isString(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  handleRegistration
)

export default router
