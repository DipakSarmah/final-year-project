/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import { fetchAppointmentsByStudent } from '../../api/student'
// appointment schedule page for students
import { useAppContext } from '../../hooks/useContextHooks'

function AppointmentSchedule() {
  const { projectDetails } = useAppContext()
  const {
    data: appointments,
    isLoading: appointmentsLoading,
    error: appointmentsFetchingError,
  } = useQuery({
    queryKey: ['appointments', projectDetails.team_id],
    queryFn: () => fetchAppointmentsByStudent(projectDetails.team_id),
  })

  if (!appointments) {
    return (
      <div className="text-xl text-blue-600 font-bold text-center">
        No Appointment Schedule with Your guide
      </div>
    )
  }
  if (appointmentsLoading) {
    return (
      <div className="text-xl text-blue-600 font-bold text-center">
        Loading... Appointment Schedule with Your guide
      </div>
    )
  }
  if (appointmentsFetchingError) {
    return (
      <div className="text-xl text-blue-600 font-bold text-center">
        Error in Fetching Appointment Schedule...
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
      {!appointments.scheduledAppointments &&
        appointments.scheduledAppointments.length === 0 && (
          <div className="text-xl text-blue-600 text-center text-pretty font-bold">
            Your guide has not shared Appointment schedule.
          </div>
        )}
      {appointments.scheduledAppointments &&
        appointments.scheduledAppointments.length !== 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Scheduled Appointments
            </h2>
            <section className="mb-6">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Date
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Time
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Description
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Leader
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      All Members
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.scheduledAppointments.map((appointment) => (
                    <tr key={appointment.appointment_id}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {new Date(appointment.time_stamp).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {new Date(appointment.time_stamp).toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {appointment.message}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {appointment.team_id}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {appointment.team_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}

      {!appointments.completedAppointments &&
        appointments.completedAppointments.length === 0 && (
          <div className="text-xl text-blue-600 text-center text-pretty font-bold">
            No appointment schedule are complete.
          </div>
        )}
      {appointments.completedAppointments &&
        appointments.completedAppointments.length !== 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Completed Appointments
            </h2>
            <section>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Date
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Time
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Description
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Leader
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      All Members
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments &&
                    appointments.completedAppointments.map((appointment) => (
                      <tr key={appointment.appointment_id}>
                        <td className="py-2 px-4 border-b border-gray-300">
                          {new Date(
                            appointment.time_stamp
                          ).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          {new Date(
                            appointment.time_stamp
                          ).toLocaleTimeString()}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          {appointment.message}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          {appointment.team_id}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          {appointment.team_name}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          </div>
        )}
    </div>
  )
}

export default AppointmentSchedule
