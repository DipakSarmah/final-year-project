import db from '../connection.js'
import AppError from '../utils/AppError.js'
import CatchAsync from '../utils/CatchAsync.js'

//====> /api/student/
// export const handleGetStudent = CatchAsync(async (req, res, next) => {
//   const { search = '', sort_by = 'first_name', sort_order = 'asc'  } = req.query

//   // Validate sort_order
//   const order = sort_order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

//   // Validate sort_by field
//   const validSortFields = [
//     'first_name',
//     'last_name',
//     'gsuite_email',
//     'department',
//   ]
//   const sortBy = validSortFields.includes(sort_by) ? sort_by : 'first_name'

//   // Create the base query
//   let query = 'SELECT * FROM `student_table` WHERE `status` = "ACTIVE"'

//   // Add search functionality
//   if (search) {
//     query += `AND (first_name LIKE ? OR last_name LIKE ? OR gsuite_email LIKE ? OR department LIKE ?)`
//   }

//   // Add sorting functionality
//   query += ` ORDER BY ${sortBy} ${order}`

//   // Execute the query
//   const [results] = await db.execute(query, Array(4).fill(`%${search}%`))

//   res
//     .status(200)
//     .json({ message: 'successfully fetched the data', data: results })
// })

// export const handleGetStudent = CatchAsync(async (req, res, next) => {
//   const {
//     search = '',
//     sort_by = 'first_name',
//     sort_order = 'asc',
//     department = null,
//   } = req.query

//   // Validate sort_order
//   const order = sort_order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

//   // Validate sort_by field
//   const validSortFields = [
//     'first_name',
//     'last_name',
//     'gsuite_email',
//     'department',
//   ]
//   const sortBy = validSortFields.includes(sort_by) ? sort_by : 'first_name'

//   // Create the base query
//   let query = 'SELECT * FROM `student_table` WHERE `status` = "ACTIVE"'

//   // Add department filter for guides
//   const params = []
//   if (department) {
//     query += ' AND department = ?'
//     params.push(department)
//   }

//   // Add search functionality
//   if (search) {
//     query +=
//       ' AND (first_name LIKE ? OR last_name LIKE ? OR gsuite_email LIKE ? OR department LIKE ?)'
//     params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`)
//   }

//   // Add sorting functionality
//   query += ` ORDER BY ${sortBy} ${order}`

//   // Execute the query
//   const [results] = await db.execute(query, params)

//   res
//     .status(200)
//     .json({ message: 'successfully fetched the data', data: results })
// })

export const handleGetStudent = CatchAsync(async (req, res, next) => {
  console.log('testing handle fetch student')
  const {
    search = '',
    sort_by = 'first_name',
    sort_order = 'asc',
    department = null,
  } = req.query
  console.log(req.query)
  // Validate sort_order
  const order = sort_order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

  // Validate sort_by field
  const validSortFields = [
    'first_name',
    'last_name',
    'gsuite_email',
    'department',
  ]
  const sortBy = validSortFields.includes(sort_by) ? sort_by : 'first_name'

  // Create the base query
  let query = 'SELECT * FROM `student_table` WHERE `status` = "ACTIVE"'
  const params = []

  // Add department filter for guides
  if (department) {
    query += ' AND department = ?'
    params.push(department)
  }

  // Add search functionality
  if (search) {
    query +=
      ' AND (first_name LIKE ? OR last_name LIKE ? OR gsuite_email LIKE ? OR department LIKE ?)'
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`)
  }

  // Add sorting functionality
  query += ` ORDER BY ${sortBy} ${order}`

  // Execute the query
  const [results] = await db.execute(query, params)

  res
    .status(200)
    .json({ message: 'successfully fetched the data', data: results })
})

export const handleAddStudent = CatchAsync(async (req, res, next) => {
  const {
    enrollment_id: enrollmentId,
    first_name: firstName,
    last_name: lastName,
    gsuite_email: gsuiteEmail,
    cgpa: Cgpa,
    register_data: registerDate = null, // Corrected the field name
    sem: Sem,
    admission_year: admissionYear,
    gender = null, // Set default values to null if not provided
    profile_picture_url: profilePictureUrl = null, // Set default values to null if not provided
    status = 'ACTIVE', // Set default value to 'ACTIVE' if not provided
    course = null, // Set default values to null if not provided
    department = null, // Set default values to null if not provided
  } = req.body

  if (
    !enrollmentId ||
    !firstName ||
    !lastName ||
    !Cgpa ||
    !gsuiteEmail ||
    !Sem ||
    !admissionYear
  ) {
    return next(new AppError('All required fields must be provided', 400))
  }
  const [already_exist] = await db.execute(
    `SELECT * from student_table where enrollment_id = ?`,
    [enrollmentId]
  )

  if (already_exist.length !== 0 && already_exist[0].status === 'INACTIVE') {
    const [updateStudentStatus] = await db.execute(
      `UPDATE student_table SET status = ? WHERE enrollment_id=?`,
      [status, enrollmentId]
    )

    return res.status(200).json({
      message: 'Already exist student and status update to ACTIVE again',
      data: already_exist[0],
    })
  }

  // Execute the SQL query
  const [result] = await db.execute(
    `INSERT INTO \`student_table\` (enrollment_id, first_name, last_name, gsuite_email, cgpa, register_data, sem, admission_year, gender, profile_picture_url, status, course, department) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`,
    [
      enrollmentId,
      firstName,
      lastName,
      gsuiteEmail,
      Cgpa,
      registerDate,
      Sem,
      admissionYear,
      gender,
      profilePictureUrl,
      status,
      course,
      department,
    ]
  )

  // Send the response
  res
    .status(201)
    .json({ message: 'Student Successfully created.', itemAdded: req.body })
})

export const handleGetStudentWithId = CatchAsync(async (req, res, next) => {
  // Fetch a Student by ID
  const enrollmentId = req.params.id

  const [results, fields] = await db.execute(
    'SELECT `enrollment_id`, `first_name`, `last_name`, `gsuite_email`, `cgpa`, `register_data`, `sem`, `admission_year`, `gender`, `profile_picture_url`, `status`, `course`, `department` FROM `student_table` WHERE `enrollment_id`=?',
    [enrollmentId]
  )

  if (results.length === 0) {
    return next(new AppError('Student not found', 404))
  }

  res
    .status(200)
    .json({ message: 'Successfully fetched the data', data: results[0] })
})

//update student with enrollment number.
export const handleUpdateStudentWithId = CatchAsync(async (req, res, next) => {
  const {
    enrollment_id: enrollmentId,
    first_name: firstName,
    last_name: lastName,
    gsuite_email: gsuiteEmail,
    cgpa: Cgpa,
    register_data: RegisterDate,
    sem: Sem,
    admission_year: admissionYear,
    gender,
    profile_picture_url: profilePictureUrl,
    status,
    course,
    department,
  } = req.body
  // console.log('test handleUpdateStudentWithId 1', req.body)

  if (!enrollmentId) {
    return next(new AppError('Enrollment ID is required', 400))
  }

  const fieldsToUpdate = {
    first_name: firstName,
    last_name: lastName,
    gsuite_email: gsuiteEmail,
    cgpa: Cgpa,
    register_data: RegisterDate,
    sem: Sem,
    admission_year: admissionYear,
    gender: gender,
    profile_picture_url: profilePictureUrl,
    status: status,
    course: course,
    department: department,
  }
  // console.log('test handleUpdateStudentWithId 2', fieldsToUpdate)

  const setString = Object.keys(fieldsToUpdate)
    .filter((key) => fieldsToUpdate[key] !== undefined)
    .map((key) => `${key}=?`)
    .join(', ')

  // console.log('test handleUpdateStudentWithId 3', setString)
  const values = Object.values(fieldsToUpdate).filter(
    (value) => value !== undefined
  )
  values.push(enrollmentId)

  const [result, fields] = await db.execute(
    `UPDATE \`student_table\` SET ${setString} WHERE enrollment_id=?`,
    values
  )

  if (result.affectedRows === 0) {
    return next(new AppError('Student not found or no changes made', 404))
  }

  res.status(200).json({ message: 'Student successfully updated' })
})

// Delete a Student
export const handleDeleteStudentWithId = CatchAsync(async (req, res, next) => {
  const enrollmentId = req.params.id
  console.log(enrollmentId)

  if (!enrollmentId) {
    return next(new AppError('Enrollment ID is required', 400))
  }

  const [result, fields] = await db.execute(
    'UPDATE `student_table` SET status = ? WHERE `enrollment_id`=?',
    ['INACTIVE', enrollmentId]
  )

  const [deleteUserAccount] = await db.execute(
    'Delete from user_table where user_id = ? and role = ?',
    [enrollmentId, 'Student']
  )
  if (result.affectedRows === 0) {
    return next(new AppError('Student not found', 404))
  }

  res.status(200).json({ message: 'Student successfully deleted' })
})

export const handleGetBatchMates = CatchAsync(async (req, res, next) => {
  let enrollment_id = req.query.userId
  // console.log(req.params)
  let enrollmentId = enrollment_id.substr(0, 5)
  const [result] = await db.execute(
    `SELECT enrollment_id, first_name, last_name, gsuite_email, cgpa, sem FROM student_table WHERE enrollment_id != ? AND enrollment_id LIKE ?`,
    [enrollment_id, `${enrollmentId}%`]
  )
  // console.log(result)
  res.status(200).json({
    message: 'got all student',
    data: result,
  })
})

export const handleGetAllTeamRequest = CatchAsync(async (req, res, next) => {
  let enrollment_id = req.query.userId

  const [AllTeamRequestWithUserId] = await db.execute(
    `SELECT sender_id,receiver_id,status, time_stamp,type,request_id from team_notification_table where receiver_id=?`,
    [enrollment_id]
  )

  res.status(200).json({
    message: 'Got All Team request notification.',
    data: AllTeamRequestWithUserId,
  })
})

export const handleAddNewTeam = CatchAsync(async (req, res, next) => {
  const userId = req.body.enrolliD
  const semester = req.body.sem
  const averageCgpa = req.body.cgpa
  const memberNumber = 1
  if (!userId || !semester || !memberNumber || !averageCgpa) {
    return next(new AppError('Insufficient data to create a team', 400))
  }
  const [teamDetails] = await db.execute(
    `Select team_id,team_name,members_number,semester from project_team_table where team_name LIKE ?`,
    [`%${userId}%`]
  )
  if (teamDetails[0]) {
    return next(
      new AppError(
        `Team already exist/joined with id: ${teamDetails[0].team_id}`,
        400
      )
    )
  }
  const [createTeam] = await db.execute(
    'insert into project_team_table (team_id,team_name,members_number,semester,avg_cgpa) values (?,?,?,?,?)',
    [userId, userId, memberNumber, semester, averageCgpa]
  )

  res.status(201).json({
    message: `successfully created team with team id ${userId}`,
    data: createTeam,
  })
})

export const handleFetchTeammates = CatchAsync(async (req, res, next) => {
  let enrollment_id = req.query.userId

  const [teamDetails] = await db.execute(
    `SELECT * FROM project_team_table WHERE team_name LIKE ?`,
    [`%${enrollment_id}%`]
  )

  if (!teamDetails || teamDetails.length === 0) {
    return next(
      new AppError('You are not in any team/you don’t have any team', 400)
    )
  }

  let teamName = teamDetails[0].team_name
  let AllTeamNames = teamName.split('_')
  // Constructing SQL query using placeholders
  let placeholders = AllTeamNames.map(() => '?').join(',')
  let AllTeammateDetailsSqlStatement = `SELECT first_name,last_name,sem, enrollment_id, cgpa, gsuite_email FROM student_table WHERE enrollment_id IN (${placeholders})`
  // Unpacking the array into individual parameters using spread operator
  const [AllTeammateDetails] = await db.execute(
    AllTeammateDetailsSqlStatement,
    [...AllTeamNames]
  )

  if (!AllTeammateDetails || AllTeammateDetails.length === 0) {
    return next(new AppError('No members in the team!'))
  }
  res.status(200).json({
    message: 'successfully fetch teammates.',
    data: { AllTeammateDetails, teamDetails },
  })
})

export const handleAddNewMemberToTeam = CatchAsync(async (req, res, next) => {
  // console.log(req.body)
  const senderId = req.body.sender_id
  const receiverId = req.body.receiver_id
  const status = req.body.status
  const NotificationType = req.body.type
  const NotificationRequestId = req.body.request_id
  const cgpa = req.body.cgpa

  const [hasReceiverInTeam] = await db.execute(
    `select team_id from project_team_table where team_id = ?`,
    [receiverId]
  )

  if (hasReceiverInTeam.length) {
    return next(
      new AppError(
        'You have a Team, Contact Admin/Guide to Join another Team. '
      )
    )
  }
  const [hasJoinedTeam] = await db.execute(
    `select team_id, team_name from project_team_table where team_name LIKE ?`,
    [`%${receiverId}%`]
  )

  if (hasJoinedTeam.length) {
    return next(
      new AppError(
        'You are already in a Team, Contact Admin/Guide to Join another Team.'
      )
    )
  }

  const [TeamOfSender] = await db.execute(
    `select * from project_team_table where team_id = ?`,
    [senderId]
  )

  if (TeamOfSender.length === 0) {
    return next(new AppError(`There is no team with team Id ${senderId}`, 400))
  }
  if (TeamOfSender[0].members_number >= 3) {
    //delete the notification
    return next(
      new AppError('Maximum limit of 3 team members already reached!', 400)
    )
  }

  let teamName = TeamOfSender[0].team_name
  let Sem = TeamOfSender[0].semester
  let membersNumber = TeamOfSender[0].members_number
  let teamId = TeamOfSender[0].team_id
  let avgCgpa = TeamOfSender[0].avg_cgpa

  teamName = teamName + `_${receiverId}`
  avgCgpa = parseFloat(
    ((avgCgpa * membersNumber + cgpa) / (membersNumber + 1)).toFixed(2)
  )
  membersNumber = membersNumber + 1

  const [updateTeamOfSender] = await db.execute(
    `update project_team_table set team_name = ? , members_number = ?, avg_cgpa = ? where team_id = ?`,
    [teamName, membersNumber, avgCgpa, teamId]
  )
  const [deleteNotification] = await db.execute(
    `delete from team_notification_table where request_id = ?`,
    [`${senderId}_${receiverId}`]
  )

  res.status(200).json({
    message: `You joined the team of ${teamId} successfully`,
    status: 'success',
  })
})

export const handleAddNotificationStudentTeammate = CatchAsync(
  async (req, res, next) => {
    const { senderId, receiverId, sem } = req.body

    const [teamDetails] = await db.execute(
      `Select team_id,team_name,members_number,semester from project_team_table where team_id LIKE ?`,
      [senderId]
    )
    if (!teamDetails[0]) {
      return next(
        new AppError(
          'Create a team before sending Add team member request.',
          400
        )
      )
    }

    if (teamDetails[0].members_number > 3)
      return next(new AppError('Number of Team Member limit exhausted', 400))

    let requestId = `${senderId}_${receiverId}`
    const status = 'Not_Seen'
    let date = new Date()
    let timeStamp = date.toISOString().slice(0, 19).replace('T', ' ')
    const notificationType = 'ADD_TEAMMATE'

    const [addnotification] = await db.execute(
      `insert into team_notification_table (request_id,sender_id,receiver_id,status,time_stamp,type) values (?,?,?,?,?,?)`,
      [requestId, senderId, receiverId, status, timeStamp, notificationType]
    )
    res.status(201).json({
      message: `notification successfully send to user with id ${receiverId} from ${senderId}`,
    })
  }
)

export const handleDeleteNotificationTeamRequest = CatchAsync(
  async (req, res, next) => {
    // console.log(req.body)
    const requestId = req.body.request_id
    if (!requestId) {
      return next(
        new AppError('insufficient data to reject the team request', 400)
      )
    }
    const [deleteTeamRequestNotification] = await db.execute(
      `delete from team_notification_table where request_id = ?`,
      [requestId]
    )
    res.status(200).json({
      message: 'Team request rejected.',
      status: 'success',
    })
  }
)

export const handleAddTeamPreference = CatchAsync(async (req, res, next) => {
  // console.log(req.body)
  const teamId = req.body.teamId
  const preferences = req.body.preferences
  const preferenceString = JSON.stringify(preferences)
  // console.log(typeof preferenceString)
  if (!teamId || !preferences || preferences.length === 0) {
    return next(new AppError('Invalid input', 400))
  }
  const [isTeamPreferenceExist, teamPreferenceFields] = await db.execute(
    'select * from team_preference_table where team_id = ?',
    [teamId]
  )

  console.log(isTeamPreferenceExist)
  if (isTeamPreferenceExist.length !== 0) {
    return next(
      new AppError(
        'Preferences for project is already given by your team.',
        400
      )
    )
  }

  const [addPreferences, fields] = await db.execute(
    'insert into team_preference_table (team_id,preferences) VALUES (?,?)',
    [teamId, preferenceString]
  )

  res.status(201).json({
    message: 'Preferences Saved Successfully',
    data: req.body,
  })
})
