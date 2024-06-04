import CatchAsync from '../utils/CatchAsync.js'
import db from '../connection.js'
import AppError from '../utils/AppError.js'

// adding new project
export const handleAddProjectGuide = CatchAsync(async (req, res, next) => {
  const { email, guideId, firstName, lastName, department } = req.body
  if (!email || !guideId || !firstName || !lastName || !department) {
    return next(new AppError('all fields are required', 400))
  }
  const [result, fields] = await db.execute(
    'INSERT INTO project_guide (email, guide_id, first_name, last_name, dept_id) VALUES (?,?,?,?,?);',
    [email, guideId, firstName, lastName, department]
  )
  res.status(201).json({
    message: 'Project guide details was successfully added.',
    itemAdded: req.body,
  })
})

//GET /api/project-guide?search=John&sort_by=last_name&sort_order=desc

export const handleGetProjectGuides = CatchAsync(async (req, res, next) => {
  const { search = '', sort_by = 'first_name', sort_order = 'asc' } = req.query

  // Validate sort_order
  const order = sort_order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

  // Validate sort_by field
  const validSortFields = ['first_name', 'last_name', 'email', 'dept_id']
  const sortBy = validSortFields.includes(sort_by) ? sort_by : 'first_name'

  // Create the base query
  let query =
    'SELECT `email`, `guide_id`, `first_name`, `last_name`, `dept_id` FROM `project_guide` WHERE `status` = "ACTIVE"'

  // Add search functionality
  let queryParams = []
  if (search) {
    query +=
      ' AND (`first_name` LIKE ? OR `last_name` LIKE ? OR `email` LIKE ? OR `dept_id` LIKE ?)'
    queryParams = Array(4).fill(`%${search}%`)
  }

  // Add sorting functionality
  query += ` ORDER BY ${sortBy} ${order}`

  // Execute the query
  const [results, fields] = await db.execute(query, queryParams)

  res
    .status(200)
    .json({ message: 'successfully fetched the data', data: results })
})

// GET /api/project-guide/id

export const handleGetProjectGuideWithId = CatchAsync(
  async (req, res, next) => {
    const { id: guide_id } = req.params

    const [guideDetails] = await db.execute(
      'SELECT * FROM project_guide WHERE guide_id = ?',
      [guide_id]
    )

    if (guideDetails.length === 0) {
      return res.status(404).json({ message: 'Guide not found' })
    }

    const [teamMembers] = await db.execute(
      'SELECT s.student_id, s.name, s.email FROM team t JOIN student s ON t.member_id = s.student_id WHERE t.guide_id = ?',
      [guide_id]
    )

    res.status(200).json({ guide: guideDetails[0], teamMembers })
  }
)

export const handleGetTeamUnderGuideId = CatchAsync(async (req, res, next) => {
  const { guideId: guide_id } = req.params
  const [teamDetailsUnderGuideId] = await db.execute(
    'SELECT p.project_id ,p.project_name, t.team_id, t.team_name, t.semester, t.members_number, t.avg_cgpa ' +
      'FROM project_table p ' +
      'JOIN project_team_table t ON p.team_id = t.team_id ' +
      'WHERE p.guide_id = ?',
    [guide_id]
  )

  res.status(200).json({
    message: 'Teams fetched successfully',
    data: teamDetailsUnderGuideId,
  })
})

export const fetchResourcesByTeamAndGuide = CatchAsync(
  async (req, res, next) => {
    const { teamId, guideId } = req.params

    const [resources] = await db.execute(
      'SELECT * FROM team_file WHERE team_id = ? AND guide_id = ?',
      [teamId, guideId]
    )

    res.status(200).json({ resources })
  }
)

export const handleDeleteProjectGuide = CatchAsync(async (req, res, next) => {
  const { id } = req.params
  // console.log(req.params)

  const [isAdmin] = await db.execute(
    'SELECT * FROM user_table where user_id=?',
    [id]
  )
  // console.log(isAdmin)
  if (isAdmin[0].role === 'Admin') {
    return next(new AppError('You cannot delete Admin'))
  }

  //if not admin set inactive
  const [results] = await db.execute(
    'UPDATE `project_guide` SET status = ? WHERE `guide_id` = ?',
    ['INACTIVE', id]
  )
  //and delete the user form user_table
  const [deleteUserAccount] = await db.execute(
    'DELETE FROM user_table WHERE user_id = ? and role = ? ',
    [id, isAdmin[0].role]
  )

  if (results.affectedRows === 0) {
    return res.status(404).json({ message: 'Guide not found' })
  }

  res.status(200).json({ message: 'Guide successfully deleted' })
})

export const handleEditProjectGuide = CatchAsync(async (req, res, next) => {
  const { id } = req.params
  const { email, firstName, lastName, department } = req.body
  // console.log(req.body)
  // Check for missing or undefined parameters
  if (!id || !email || !firstName || !lastName || !department) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const [results] = await db.execute(
    'UPDATE `project_guide` SET `email` = ?, `first_name` = ?, `last_name` = ?, `dept_id` = ? WHERE `guide_id` = ?',
    [email, firstName, lastName, department, id]
  )

  if (results.affectedRows === 0) {
    return res.status(404).json({ message: 'Guide not found' })
  }

  res.status(200).json({ message: 'Guide successfully updated' })
})
