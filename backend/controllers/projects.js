import db from '../connection.js'
import AppError from '../utils/AppError.js'
import CatchAsync from '../utils/CatchAsync.js'

// export const handleGetProject = CatchAsync(async (req, res, next) => {
//   const {
//     search = '',
//     sort_by = 'project_name',
//     sort_order = 'asc',
//   } = req.query

//   // Validate sort_order
//   const order = sort_order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

//   // Validate sort_by field
//   const validSortFields = [
//     'project_name',
//     'project_start_date',
//     'project_end_date',
//     'department_name',
//     'semester',
//     'course',
//   ]
//   const sortBy = validSortFields.includes(sort_by) ? sort_by : 'project_name'

//   // Create the base query
//   let query = 'SELECT * FROM `project_table`'

//   // Add search functionality
//   if (search) {
//     query += ` WHERE project_name LIKE ? OR project_description LIKE ? OR project_tagname LIKE ? OR department_name LIKE ? OR course LIKE ? OR guide_id LIKE ?`
//   }

//   // Add sorting functionality
//   query += ` ORDER BY ${sortBy} ${order}`

//   // Execute the query safely using parameterized queries
//   const [results] = await db.execute(query, Array(6).fill(`%${search}%`))

//   res
//     .status(200)
//     .json({ message: 'successfully fetched the data', data: results })
// })

export const handleGetProject = CatchAsync(async (req, res, next) => {
  const {
    search = '',
    sort_by = 'project_name',
    sort_order = 'asc',
    guide_id = null,
  } = req.query

  console.log(req.query)
  // Validate sort_order
  const order = sort_order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

  // Validate sort_by field
  const validSortFields = [
    'project_name',
    'project_start_date',
    'project_end_date',
    'department_name',
    'semester',
    'course',
  ]
  const sortBy = validSortFields.includes(sort_by) ? sort_by : 'project_name'

  // Create the base query
  let query = 'SELECT * FROM `project_table` WHERE 1=1 '

  const queryParams = []

  // Add search functionality
  if (search) {
    query += ` AND (project_name LIKE ? OR project_description LIKE ? OR project_tagname LIKE ? OR department_name LIKE ? OR course LIKE ?)`
    queryParams.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    )
  }

  // Add guide_id filter for role 'guide'
  console.log(guide_id)
  if (guide_id) {
    query += ' AND guide_id = ?'
    queryParams.push(guide_id)
  }

  // Add sorting functionality
  query += ` ORDER BY ${sortBy} ${order}`

  // Execute the query safely using parameterized queries
  const [results] = await db.execute(query, queryParams)

  res
    .status(200)
    .json({ message: 'successfully fetched the data', data: results })
})

export const handleFetchUnallotedProject = CatchAsync(
  async (req, res, next) => {
    const departmentName = req.query.department
    const course = req.query.course
    const [projects] = await db.execute(
      `SELECT * FROM project_table WHERE (department_name=? AND course=? AND ((allotted_type IS NULL) OR (allotted_type = ?)))`,
      [departmentName, course, 'AUTO']
    )

    res.status(200).json({
      message: 'Successfully fetch the unallotted projects',
      data: projects,
    })
  }
)

// get one project with id
export const handleGetProjectWithId = CatchAsync(async (req, res, next) => {
  const id = req.params.projectId
  const [results] = await db.execute(
    'SELECT * FROM `project_table` WHERE project_id = ?',
    [id]
  )
  if (results.length === 0) {
    return res.status(404).json({ message: 'Project not found' })
  }
  res
    .status(200)
    .json({ message: 'Successfully fetched project', data: results[0] })
})

// delete project with id
export const handleDeleteProjectWithId = CatchAsync(async (req, res, next) => {
  const id = req.params.projectId
  const [result] = await db.execute(
    'DELETE FROM `project_table` WHERE project_id = ?',
    [id]
  )

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Project not found' })
  }

  res.status(200).json({ message: 'Successfully deleted project' })
})

//update project
export const handleUpdateProjectWithId = CatchAsync(async (req, res, next) => {
  const projectId = req.params.projectId
  const id = req.params.projectId
  const {
    project_name,
    project_description,
    project_start_date,
    project_end_date,
    project_tagname,
    department_name,
    semester,
    guide_id,
    team_id,
    allotted_type,
    course,
  } = req.body
  // console.log('test handle update project', req.body)
  const [result] = await db.execute(
    'UPDATE `project_table` SET project_name = ?, project_description = ?, project_start_date = ?, project_end_date = ?, project_tagname = ?, department_name = ?, semester = ?, guide_id = ?, team_id = ?, allotted_type = ?, course = ? WHERE project_id = ?',
    [
      project_name,
      project_description,
      project_start_date,
      project_end_date,
      project_tagname,
      department_name,
      semester,
      guide_id,
      team_id,
      allotted_type,
      course,
      id,
    ]
  )

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Project not found' })
  }

  res.status(200).json({ message: 'Successfully updated project' })
})

// add new project
export const handleAddProject = CatchAsync(async (req, res, next) => {
  const {
    project_id,
    project_name,
    project_description,
    project_start_date,
    project_end_date,
    project_tagname,
    department_name,
    semester,
    guide_id,
    team_id = null,
    allotted_type = null,
    course,
  } = req.body
  if (
    !project_id ||
    !project_name ||
    !project_description ||
    !project_start_date ||
    !project_end_date ||
    !project_tagname ||
    !department_name ||
    !guide_id ||
    !semester ||
    !course
  ) {
    return next(new AppError('All fields are required', 400))
  }

  // console.log('test in handle add project')
  let query = `INSERT INTO \`project_table\` (project_id, project_name, project_description, project_tagname, project_start_date, project_end_date, department_name, semester, guide_id, course) VALUES (?,?,?,?,?,?,?,?,?,?);`
  let values = [
    project_id,
    project_name,
    project_description,
    project_tagname,
    project_start_date,
    project_end_date,
    department_name,
    semester,
    guide_id,
    course,
  ]
  if (team_id) {
    query = `INSERT INTO \`project_table\` (project_id, project_name, project_description, project_tagname, project_start_date, project_end_date, department_name, semester, guide_id, course, team_id, allotted_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`
    values.push(team_id)
    values.push(allotted_type)
    // console.log('values', values)
  }
  const [result, fields] = await db.execute(query, values)
  // console.log(result)
  res
    .status(201)
    .json({ message: 'Project Successfully created.', itemAdded: req.body })
})
