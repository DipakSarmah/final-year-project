import AppError from '../utils/AppError.js'
import CatchAsync from '../utils/CatchAsync.js'
import db from '../connection.js'

export const handleGetAllTeam = CatchAsync(async (req, res, next) => {
  const [teams] = await db.execute('SELECT * FROM `project_team_table`')
  res
    .status(200)
    .json({ message: 'successfully fetch all teams.', data: teams })
})

export const getTeamMembers = CatchAsync(async (req, res, next) => {
  const { teamId } = req.params
  const [members] = await db.execute(
    'SELECT * FROM `project_team_table` WHERE `team_id` = ?',
    [teamId]
  )
  if (members.length === 0) return next(new AppError('No team found', 404))
  const memberListString = members[0].team_name
  const memberList = memberListString.split('_')
  let placeholders = memberList.map(() => '?').join(',')
  //   console.log(placeholders)
  const [allTeamMembers] = await db.execute(
    `Select enrollment_id, gsuite_email, first_name,last_name,cgpa,sem, admission_year,gender, course,department From student_table where enrollment_id in (${placeholders})`,
    [...memberList]
  )
  //   console.log(allTeamMembers)
  res.status(200).json({ data: allTeamMembers })
})

export const handleDeleteTeam = CatchAsync(async (req, res, next) => {
  const { teamId } = req.params
  if (!teamId) return next(new AppError('Team id is required', 400))
  const [result] = await db.execute(
    'DELETE FROM `project_team_table` WHERE `team_id` = ?',
    [teamId]
  )
  if (result.affectedRows === 0) {
    return next(new AppError('Team not found', 404))
  }
  res.status(200).json({ message: 'Team successfully deleted' })
})
