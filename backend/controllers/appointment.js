import AppError from '../utils/AppError.js'
import CatchAsync from '../utils/CatchAsync.js'
import transporter from '../utils/email.js'
import { v4 as uuidv4 } from 'uuid'
import { getStudentDetails } from '../models/students/studentQuery.js'

import { createAppointment } from '../models/guide/appointment.js'
import db from '../connection.js'

export const handleAddscheduleAppointment = CatchAsync(
  async (req, res, next) => {
    const {
      appointmentDateTime,
      guideEmail,
      guideId,
      guideName,
      message,
      subject,
      teamName,
      teamId,
    } = req.body

    // Validate data
    if (
      !appointmentDateTime ||
      !guideEmail ||
      !guideId ||
      !guideName ||
      !message ||
      !subject ||
      !teamName
    ) {
      return next(new AppError('All fields are required', 400))
    }

    // Validate appointmentDateTime
    const appointmentDate = new Date(appointmentDateTime)
    const currentDate = new Date()

    if (appointmentDate <= currentDate) {
      return next(new AppError('Select future time only', 400))
    }

    // Split teamName into array of student IDs
    const studentIds = teamName.split('_')

    // Fetch student details
    const students = await getStudentDetails(studentIds)
    if (students.length === 0) {
      return next(new AppError('No students found', 404))
    }
    console.log('test appointment students:', students)

    // Compose and send emails
    const emailPromises = students.map((student) => {
      const mailOptions = {
        // from: `${guideName} <${guideEmail}>`,
        from: `${guideName} <sarmahd60@gmail.com>`,
        to: student.gsuite_email,
        subject,
        // text: `Dear ${student.first_name} ${student.last_name},\n\nMessage: \n\n${message}\n\nAppointment Date and Time: ${appointmentDateTime}\n\nBest Regards,\n${guideName}`,
        text: `Dear ${student.first_name} ${student.last_name},\n\nMessage: ${message}\n\nYour professor DR. ${guideName} <${guideEmail}> send you an appointment.\n\nAppointment Date and Time: ${appointmentDateTime}\n\nBest Regards,\n${guideName}`,
      }

      return transporter.sendMail(mailOptions)
    })

    await Promise.all(emailPromises)

    // Store appointment in database
    const appointment_id = uuidv4()
    const appointment = {
      appointment_id,
      appointmentDateTime,
      guideId,
      subject,
      message,
      teamId,
    }
    await createAppointment(appointment)

    res
      .status(201)
      .json({ message: 'Appointment scheduled and emails sent successfully' })
  }
)

export const HandleGetListOfPointment = () => {}

export const handleGetAppointmentWithGuideId = CatchAsync(
  async (req, res, next) => {
    const { guideId } = req.params
    console.log('test from handle get appoint api', guideId)

    const [rows] = await db.query(
      `SELECT 
      a.appointment_id, 
      a.guide_id, 
      a.team_id, 
      a.time_stamp, 
      a.subject, 
      a.message, 
      t.team_name,
      CASE 
        WHEN a.time_stamp < NOW() THEN 'Completed' 
        ELSE 'Scheduled' 
      END AS appointStatus 
    FROM 
      appointment_table a
    JOIN 
      project_team_table t ON a.team_id = t.team_id 
    WHERE 
      a.guide_id = ? ORDER BY 
      a.time_stamp ASC`,
      [guideId]
    )

    const scheduledAppointments = rows.filter(
      (app) => app.appointStatus === 'Scheduled'
    )
    const completedAppointments = rows.filter(
      (app) => app.appointStatus === 'Completed'
    )

    res.status(200).json({
      message: 'Successfully fetch the appointments.',
      data: { scheduledAppointments, completedAppointments },
    })
  }
)
