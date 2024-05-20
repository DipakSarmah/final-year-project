import db from '../connection.js'
import CatchAsync from '../utils/CatchAsync.js'

// get all projects
export const handleGetProject = CatchAsync(async (req, res, next) => {
  const [results, fields] = await db.execute(
    'SELECT `project_id`,`project_name`,`project_description`,`project_start_date`,`project_end_date`,`project_tagname` FROM `project_table`'
  )

  console.log(results)
  res
    .status(200)
    .json({ message: 'successfully fatched the data', data: results })
})

// get one project
export const handleGetProjectWithId = CatchAsync(async (req, res, next) => {
  const projectId = req.params.projectId
  const [result, fields] = await db.execute(
    'SELECT `project_id`,`project_name`,`project_description`,`project_start_date`,`project_end_date`,`project_tagname` FROM `project_table` where `project_id`=?',
    [projectId]
  )
  console.log(result)
  res
    .status(200)
    .json({ message: 'data fatched successfully', data: result[0] })
})
// delete project
export const handleDeleteProjectWithId = CatchAsync(async (req, res, next) => {
  const projectId = req.params.projectId
  const result = await db.execute(
    'Delete from `project_table` where `project_id`=?',
    [projectId]
  )
  res.status(200).json({
    message: `Successfully removed project with project Id : ${projectId}`,
  })
})

//update project
export const handleUpdateProjectWithId = CatchAsync(async (req, res, next) => {
  const projectId = req.params.projectId

  const updates = req.body
  console.log(updates)
  // Get a connection from the pool
  // const connection = await db.getConnection()

  // ----------------------------------need to be updated soo ----------------------------------------------

  // try {
  //   // Begin transaction
  //   await connection.beginTransaction()

  //   // Apply partial update to the project in the database
  //   const [result] = await connection.execute(
  //     'UPDATE project_table SET ? WHERE projectId = ?',
  //     [updates, projectId]
  //   )

  //   // Commit transaction
  //   await connection.commit()

  //   // Release the connection back to the pool
  //   connection.release()

  //   res.json({ message: 'Project updated successfully', data: result })
  // } catch (error) {
  //   // Rollback transaction in case of error
  //   await connection.rollback()

  //   // Release the connection back to the pool
  //   if (connection) {
  //     connection.release()
  //   }

  //   console.error('Error updating project:', error)
  //   res.status(500).json({ error: 'Internal Server Error' })
  // }
})

// add new project
export const handleAddProject = CatchAsync(async (req, res, next) => {
  //   console.log(req.body)
  const {
    projectId,
    projectName,
    projectDescription,
    projectStartDate,
    projectEndDate,
    projectTagName,
  } = req.body
  if (
    !projectId ||
    !projectName ||
    !projectDescription ||
    !projectStartDate ||
    !projectEndDate ||
    !projectTagName
  ) {
    return next(new AppError('all fields are required', 400))
  }

  // console.log('inside try catch: ', projectId)
  const [result, fields] = await db.execute(
    `INSERT INTO \`project_table\` (project_id, project_name, project_description, project_tagname, project_start_date, project_end_date) VALUES (?,?,?,?,?,?);`,
    [
      projectId,
      projectName,
      projectDescription,
      projectTagName,
      projectStartDate,
      projectEndDate,
    ]
  )
  // console.log(result)
  res
    .status(201)
    .json({ message: 'Project Successfully created.', itemAdded: req.body })
})
