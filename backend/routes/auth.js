import express from 'express'
import { check } from 'express-validator'
import { handleSignIn } from '../controllers/users.js'

const router = express.Router()

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  handleSignIn
)



export default router
