import CatchAsync from '../utils/CatchAsync.js'
import db from '../connection.js'
import AppError from '../utils/AppError.js'

export const handleAddProjectGuide = CatchAsync(async (req, res, next) => {
  const { email, guideId, firstName, lastName, department } = req.body
  if (!email || !guideId || !firstName || !lastName || !department) {
    // return res.status(400).json({ message: 'all fields are required' })
    return next(new AppError('all fields are required', 400))
  }
  // console.log('inside try catch: ', projectId)
  const [result, fields] = await db.execute(
    'INSERT INTO project_guide (email, guide_id, first_name, last_name, dept_name) VALUES (?,?,?,?,?);',
    [email, guideId, firstName, lastName, department]
  )
  res.status(201).json({
    message: 'Project guide details was successfully added.',
    itemAdded: req.body,
  })
})
