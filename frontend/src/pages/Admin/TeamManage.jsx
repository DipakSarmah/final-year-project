import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Modal from '../../components/Modal'
import { fetchTeams, fetchTeamMembers, deleteTeam } from '../../api/admin'
import AllTeamMemberDetails from '../../components/Admin/AllTeamMemberDetails'
import { useAppContext } from '../../hooks/useContextHooks'
import { ToastMessageType } from '../../variables'

function TeamManagement() {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteTeamModal, setOpenDeleteTeamModal] = useState(false)
  const [tobeDeletedTeamId, setToBeDeletedTeamId] = useState(false)
  const { showToast } = useAppContext()
  const queryClient = useQueryClient()

  const { data: teams, isLoading: isLoadingTeams } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  })

  const { data: members, refetch: refetchMembers } = useQuery({
    queryKey: ['teamMembers', selectedTeam],
    queryFn: () => fetchTeamMembers(selectedTeam),
    enabled: !!selectedTeam,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      setOpenDeleteTeamModal(false)
      queryClient.invalidateQueries('teams')
      showToast({
        message: 'Successfully Removed the Team details',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      setOpenDeleteTeamModal(false)
      showToast({
        message: error.message,
        type: ToastMessageType.error,
      })
      console.error('Error deleting the student:', error)
    },
  })
  const handleSelectTeam = (teamId) => {
    // console.log(teamId)
    setSelectedTeam(teamId)
    refetchMembers()
    // if (members) console.log(members)
  }

  const CloseModal = () => {
    setOpenModal(false)
  }
  const handleCloseDeleteTeamModal = () => {
    setOpenDeleteTeamModal(false)
  }
  const handleOpenModal = (team) => {
    handleSelectTeam(team.team_id)
    setOpenModal(true)
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-8">Team Management</h1>
      {isLoadingTeams ? (
        <p>Loading teams...</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left font-semibold text-gray-700">
                  Team Name
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold text-gray-700">
                  Semester
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold text-gray-700">
                  Members
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold text-gray-700">
                  Avg CGPA
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {teams &&
                teams.map((team) => (
                  <tr key={team.team_id}>
                    <td className="py-2 px-4 border-b">{team.team_name}</td>
                    <td className="py-2 px-4 border-b">{team.semester}</td>
                    <td className="py-2 px-4 border-b">
                      {team.members_number}
                    </td>
                    <td className="py-2 px-4 border-b">{team.avg_cgpa}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => handleOpenModal(team)}
                      >
                        View Members
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                          setToBeDeletedTeamId(team.team_id)
                          setOpenDeleteTeamModal(true)
                        }}
                      >
                        Delete Team
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isVisible={openModal} onClose={CloseModal}>
        <AllTeamMemberDetails allTeamMembers={members} />
      </Modal>
      <Modal
        isVisible={openDeleteTeamModal}
        onClose={handleCloseDeleteTeamModal}
      >
        <div>
          <h2 className="text-xl font-semibold mb-4">Delete Team</h2>
          <p className="mb-6 text-red-600">
            <strong>Warning:</strong> Are you sure you want to delete the
            details of this Team from the Database? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleCloseDeleteTeamModal}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              onClick={() => deleteMutation.mutate(tobeDeletedTeamId)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TeamManagement
