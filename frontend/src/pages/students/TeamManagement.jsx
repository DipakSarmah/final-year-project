import { useQuery } from '@tanstack/react-query'
import {
  fetchProjectAllocation,
  handleFetchAllTeammates,
} from '../../api/student'
import { useAppContext } from '../../hooks/useContextHooks'
import Modal from './../../components/Modal'
import AppointmentSchedule from '../../components/students/AppointmentSchedule'
import { useEffect, useState } from 'react'
import StudentResourceCenter from './ResourceCenter'
function TeamManagement() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const { user, projectDetails, updatedIsProjectAllocationForStudent } =
    useAppContext()
  const {
    data: teamNmateDetails,
    isLoading: teamLoading,
    isError: teamFetchError,
  } = useQuery({
    queryKey: ['team-members'],
    queryFn: () => handleFetchAllTeammates(user.enrollment_id),
  })

  useEffect(() => {
    // console.log('team details: ', teamNmateDetails)
    if (teamNmateDetails) {
      const teamId = teamNmateDetails.teamDetails[0].team_id
      fetchProjectAllocation(teamId).then((data) => {
        // console.log('this is useeffect', data)
        // setIsProjectAllocated(data.allocated)
        updatedIsProjectAllocationForStudent(data.allocated, data.project)
      })
    }
  }, [teamNmateDetails]) //teamNmateDetails

  if (!teamNmateDetails) {
    return (
      <div className="text-xl text-center font-bold text-blue-500">
        You have no team to view. Make team with your classmate or create your
        own team.
      </div>
    )
  }
  const handleCloseModal = () => {
    setShowAppointmentModal(false)
  }
  const handleOpenAppointmentModal = () => {
    setShowAppointmentModal(true)
  }
  if (teamLoading) {
    return (
      <div className="text-xl text-center font-bold text-yellow-300">
        Loading Team details...
      </div>
    )
  }
  if (teamFetchError) {
    return (
      <div className="text-xl text-center font-bold text-yellow-300">
        Sorry, Error in loading team details...
      </div>
    )
  }
  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col justify-center items-center p-4">
      {projectDetails && (
        <div className="bg-gray-300 p-4 rounded-lg mb-6 shadow-lg w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-pretty text-center mb-6">
            Project Details of your team
          </h1>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-xl text-pretty font-bold text-center">
              Project Id: {projectDetails.project_id}
            </div>
            <div className="text-xl text-pretty font-bold text-center">
              Project Name: {projectDetails.project_name}
            </div>
            <div className="text-xl text-pretty font-bold text-center">
              Project Description: {projectDetails.project_description}
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl">
        <div className="bg-gray-300 p-4 rounded-lg mb-6 shadow-lg">
          <p className="text-lg font-sans mb-4 text-center text-pretty font-bold">
            See all the appointment schedules with your guide
          </p>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white rounded-lg py-2 px-4 font-semibold hover:bg-blue-600 transition duration-300"
              onClick={handleOpenAppointmentModal}
            >
              View Appointment Schedule
            </button>
          </div>
        </div>
        <Modal onClose={handleCloseModal} isVisible={showAppointmentModal}>
          <AppointmentSchedule teamDetails={teamNmateDetails.teamDetails} />
        </Modal>
        {/* <StudentResourceCenter projectDetails={projectDetails} /> */}
        <StudentResourceCenter />
      </div>
    </div>
  )
}

export default TeamManagement
