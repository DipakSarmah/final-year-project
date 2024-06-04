import express from 'express'
import db from '../connection.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/utils.js'
import CatchAsync from '../utils/CatchAsync.js'
import AppError from '../utils/AppError.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export const handleRegistration = CatchAsync(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { userId, email, role, password, confirmPassword } = req.body
  // console.log(req.body)
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match" })
  }

  // Check if the user already exists
  const [existingUser] = await db.execute(
    'SELECT user_id, email FROM user_table WHERE user_id = ?',
    [userId]
  )
  if (existingUser.length > 0) {
    return res.status(400).json({ message: 'User already exists' })
  }
  // console.log(res.body)
  // Validate user based on role
  let isValidUser
  if (role === 'Student') {
    ;[isValidUser] = await db.execute(
      'SELECT enrollment_id, gsuite_email,cgpa,first_name,last_name,sem,department,course,admission_year FROM student_table WHERE enrollment_id = ? AND gsuite_email = ?',
      [userId, email]
    )
  } else if (role === 'Guide' || role === 'Admin') {
    ;[isValidUser] = await db.execute(
      'SELECT guide_id, email, first_name,last_name,dept_id FROM project_guide WHERE guide_id = ? AND email = ?',
      [userId, email]
    )
  }

  if (!isValidUser || isValidUser.length === 0) {
    return res.status(400).json({
      message: 'You are not from the institution. Try contacting admin.',
    })
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Insert the user into the database
  const [result] = await db.execute(
    'INSERT INTO user_table (user_id, email, role, password) VALUES (?, ?, ?, ?)',
    [userId, email, role, hashedPassword]
  )

  res.status(201).json({
    message: 'Successfully registered.',
    userDetails: isValidUser[0],
    role: role,
    token: generateToken(req.body),
  })
})

export const handleSignIn = CatchAsync(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() })
    return next(new AppError(`Invalid Credentials`, 401))
  }

  const { email, password } = req.body

  const [User] = await db.execute(
    'SELECT user_id, email, password,role FROM user_table WHERE email = ?',
    [email]
  )
  const user = User[0]
  if (!user) {
    // 401 -- unauthorized
    return res.status(401).json({ message: 'Invalid Credentials' })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid Credentials' })
  }
  let userDetails
  if (user.role === 'Student') {
    ;[userDetails] = await db.execute(
      'SELECT enrollment_id, gsuite_email,cgpa,first_name,last_name,sem,department,course,admission_year FROM student_table WHERE enrollment_id = ? AND gsuite_email = ?',
      [user.user_id, user.email]
    )
  } else if (user.role === 'Guide' || user.role === 'Admin') {
    ;[userDetails] = await db.execute(
      'SELECT guide_id, email, first_name,last_name,dept_id FROM project_guide WHERE guide_id = ? AND email = ?',
      [user.user_id, user.email]
    )
  }

  // console.log('test signin: ', userDetails)
  if (userDetails.length === 0) {
    return next(new AppError('Re-Register to Login In.', 401))
  }
  const token = generateToken(user)
  res.status(200).json({
    userDetails: userDetails[0],
    userId: user.user_id,
    token: token,
    role: user.role,
  })
})

export const protect = CatchAsync(async (req, res, next) => {
  // 1) getting token and check of it's there
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  // console.log(token)

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    )
  }

  // 2) verification token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  // console.log(decoded)
  // 3) Check if user still exist
  const [currentUser] = await db.execute(
    `SELECT user_id, role, email FROM user_table WHERE email = ? AND role = ?`,
    [decoded.email, decoded.role]
  )
  // console.log(freshUser.length)
  if (!currentUser.length) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exists.',
        401
      )
    )
  }
  // console.log(currentUser)
  // 4) Check if user change password after the token was issued
  req.user = currentUser[0]
  next()
})

// authorization middleware for only particular type of user to access the data

export const restrictTo = (...role) => {
  return (req, res, next) => {
    // role = ['student', 'admin']. role = 'student'
    // console.log(req.user.role)
    if (!role.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }
    next()
  }
}
