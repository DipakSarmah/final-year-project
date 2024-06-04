import { useQuery } from '@tanstack/react-query'
import AppointmentEmailForm from '../../forms/Guide/AppointmentEmailForm'
import { fetchAppointmentsByGuide, fetchTeamsByGuide } from '../../api/guide'
import { useAppContext } from '../../hooks/useContextHooks'

// export default TeamAppointment

function TeamAppointment() {
  const { user } = useAppContext()

  const {
    data: allTeamList,
    isLoading: teamLoading,
    error: teamFetchingError,
  } = useQuery({
    queryKey: ['teams', user.guide_id],
    queryFn: () => fetchTeamsByGuide(user.guide_id),
  })
  const {
    data: appointments,
    isLoading: appointmentsLoading,
    error: appointmentsFetchingError,
  } = useQuery({
    queryKey: ['appointments', user.guide_id],
    queryFn: () => fetchAppointmentsByGuide(user.guide_id),
  })

  if (teamLoading || appointmentsLoading)
    return <div>Loading Team... Please wait</div>
  if (teamFetchingError) return <div>Error Loading Team details</div>
  if (appointmentsFetchingError) return <div>Error Loading Appointments</div>

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Appointment Management
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Appointment Form
        </h2>
        {allTeamList && (
          <AppointmentEmailForm allTeamList={allTeamList} user={user} />
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
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
    </div>
  )
}

export default TeamAppointment
