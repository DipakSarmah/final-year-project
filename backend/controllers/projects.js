import db from '../connection.js'
import AppError from '../utils/AppError.js'
import CatchAsync from '../utils/CatchAsync.js'

export const handleGetProject = CatchAsync(async (req, res, next) => {
  const {
    search = '',
    sort_by = 'project_name',
    sort_order = 'asc',
    guide_id = null,
  } = req.query

  // console.log(req.query)
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
  // console.log(guide_id)
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

export const handleAutomaticAllotment = async (req, res, next) => {
  const { dept_id } = req.body

  try {
    // Fetch all team preferences for the given department
    const [teamPreferences] = await db.execute(
      'SELECT tp.team_id, tp.preferences, t.avg_cgpa ' +
        'FROM team_preference_table tp ' +
        'JOIN project_team_table t ON tp.team_id = t.team_id ' +
        'WHERE tp.dept_id = ? ' +
        'ORDER BY t.avg_cgpa DESC',
      [dept_id]
    )

    // Fetch unallotted projects for the given department
    const [unallottedProjects] = await db.execute(
      'SELECT * FROM project_table WHERE department_name = ? AND (allotted_type IS NULL)',
      [dept_id]
    )

    // Prepare the allotment data
    const allotmentData = []

    // Allot projects to teams based on preferences and CGPA
    for (const team of teamPreferences) {
      const preferences = team.preferences

      for (const preference of preferences) {
        const projectIndex = unallottedProjects.findIndex(
          (project) => project.project_id === preference
        )

        if (projectIndex !== -1) {
          const project = unallottedProjects[projectIndex]

          allotmentData.push({
            team_id: team.team_id,
            team_name: team.team_id, // Assuming team_name is same as team_id, you can change accordingly
            project_id: project.project_id,
            project_title: project.project_name,
            guide_id: project.guide_id,
          })

          // Remove the project from the unallotted list
          unallottedProjects.splice(projectIndex, 1)
          break
        }
      }
    }

    res.status(200).json(allotmentData)
  } catch (error) {
    console.error('Error during allotment:', error)
    next(error)
  }
}

export const confirmAllotment = CatchAsync(async (req, res, next) => {
  const { allotmentData } = req.body
  const listOfAlreadyAllotedTeams = []
  const listOfTeamsNotAbletoAllot = []

  for (const allotment of allotmentData) {
    const [isProjectAlreadyAlloted] = await db.execute(
      'select * from project_table where project_id = ?',
      [allotment.project_id]
    )
    if (isProjectAlreadyAlloted[0].team_id === null) {
      const [updateProject] = await db.execute(
        'UPDATE project_table SET team_id = ?, allotted_type = "AUTO" WHERE project_id = ?',
        [allotment.team_id, allotment.project_id]
      )
      //remove preferences

      const [removePreferences] = await db.execute(
        `DELETE FROM team_preference_table where team_id = ?`,
        [allotment.team_id]
      )
    } else if (
      isProjectAlreadyAlloted[0].team_id !== null &&
      isProjectAlreadyAlloted[0].team_id === allotment.team_id &&
      (isProjectAlreadyAlloted[0].allotted_type === 'MANUAL' ||
        isProjectAlreadyAlloted[0].allotted_type === 'AUTO')
    ) {
      listOfAlreadyAllotedTeams.push(allotment.team_id)
    } else if (
      isProjectAlreadyAlloted[0].team_id !== null &&
      isProjectAlreadyAlloted[0].team_id === allotment.team_id &&
      (isProjectAlreadyAlloted[0].allotted_type === 'MANUAL' ||
        isProjectAlreadyAlloted[0].allotted_type === 'AUTO')
    ) {
      listOfTeamsNotAbletoAllot.push(allotment.team_id)
    }
  }
  res.status(200).json({
    message: 'Allotment confirmed successfully and added to the database',
    data: { listOfAlreadyAllotedTeams, listOfTeamsNotAbletoAllot },
  })
})

export const handleGetDepartments = async (req, res, next) => {
  try {
    const [departments] = await db.execute(
      'SELECT * FROM department_details_table'
    )
    res
      .status(200)
      .json({ message: 'Departments fetched successfully', data: departments })
  } catch (error) {
    console.error('Error fetching departments:', error)
    next(error)
  }
}

export const fetchProjectAllocation = CatchAsync(async (req, res, next) => {
  const { teamId } = req.params
  // console.log('test from project allocation: ', teamId)
 
  const [projectAllocation] = await db.execute(
    'SELECT * FROM project_table WHERE team_id = ? AND (allotted_type = "MANUAL" OR allotted_type = "AUTO")',
    [teamId]
  )
  if (projectAllocation.length === 0) {
    return res
      .status(200)
      .json({ allocated: false, data: projectAllocation[0] })
  }
  // }

  // console.log('testing from proejct allocation', projectAllocation[0])
  res.status(200).json({ allocated: true, project: projectAllocation[0] })
})
