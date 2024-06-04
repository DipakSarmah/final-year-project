import db from './../../connection.js'

export const getStudentDetails = async (studentIds) => {
  const [rows] = await db.query(
    'SELECT * FROM student_table WHERE enrollment_id IN (?)',
    [studentIds]
  )
  return rows
}
