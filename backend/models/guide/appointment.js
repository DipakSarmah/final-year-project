import db from '../../connection.js'

export const createAppointment = async (appointment) => {
  const { appointment_id, appointmentDateTime, guideId, subject, message, teamId } =
    appointment
  await db.query(
    'INSERT INTO appointment_table (appointment_id, time_stamp, guide_id, subject, message,team_id) VALUES (?, ?, ?, ?, ?, ?)',
    [appointment_id, appointmentDateTime, guideId, subject, message, teamId]
  )
}
