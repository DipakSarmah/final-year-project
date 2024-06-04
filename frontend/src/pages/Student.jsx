import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { handleFetchAllTeammates } from '../api/student'
import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import ProjectPreferences from '../components/students/ProjectPreferences'
import { useAppContext } from '../hooks/useContextHooks'
function Student() {
  const [userDetails, setUserDetails] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const userDetailsRef = useRef()
  const { user } = useAppContext()
  useEffect(() => {
    const storedData = localStorage.getItem('userDetails')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      console.log(parsedData)
      userDetailsRef.current = parsedData
      setUserDetails(parsedData) // Optionally, store data in state if needed
    }
  }, [])

  useEffect(() => {
    if (userDetailsRef.current) {
      // console.log('Data from localStorage:', userDetailsRef.current)
      // Perform any side effects or operations with the ref data
    }
  }, [userDetailsRef.current]) // Only re-run if localStorageRef.current changes

  const navigate = useNavigate()
  const [showTeamMates, setShowTeamMates] = useState(false)
  const [isLeader, setIsLeader] = useState(false)
  const enrolliD = user.enrollment_id
  const sem = user.sem
  const cgpa = user.cgpa

  const fetchAllTeammates = useQuery({
    queryKey: ['team-members'],
    queryFn: () => handleFetchAllTeammates(enrolliD),
  })

  const handlefetchteammates = () => {
    setShowTeamMates((showTeamMates) => !showTeamMates)
    // console.log('clicked', isFetchTeam)
    fetchAllTeammates.refetch()
  }

  const onClose = () => {
    setShowModal(false)
  }
  const handleSetPreferences = () => {
    fetchAllTeammates.refetch().then(() => {
      const leader = fetchAllTeammates.data.teamDetails[0].team_id
      setIsLeader(leader === enrolliD)
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome {enrolliD},
        <br />
        Semester: {sem}
        <br />
        Cgpa: {cgpa}
      </h1>
      <section className="bg-gray-800 p-4 rounded-lg mb-6">
        <div className="text-center">
          <p className="text-lg font-sans mb-4">
            Want to see your team or add a member to your team? Go to the team
            page to manage your team.
          </p>
          <button
            className="bg-blue-500 rounded-lg text-white font-mono text-md font-medium px-5 py-2.5 hover:bg-blue-600"
            onClick={() => navigate('/student/team')}
          >
            Go to Teams Page
          </button>
        </div>
      </section>
      <section className="bg-gray-700 p-4 rounded-lg mb-6">
        <p className="text-lg font-bold font-sans mb-4">
          Your current team members are:
        </p>
        <button
          className="bg-blue-500 text-white rounded-lg px-4 py-2 font-mono mb-4 hover:bg-blue-600"
          onClick={() => handlefetchteammates(enrolliD)}
        >
          See Your Teammates
        </button>

        {showTeamMates && fetchAllTeammates.isLoading && <p>Loading...</p>}
        {showTeamMates && fetchAllTeammates.error && (
          <p>Error: {fetchAllTeammates.error.message}</p>
        )}

        {showTeamMates && fetchAllTeammates.data && (
          <div className="bg-gray-600 p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Team Details</h1>
            <p className="text-lg font-semibold mb-4">
              Team Id: {fetchAllTeammates.data.teamDetails[0].team_id}
              <br />
              No of members:{' '}
              {fetchAllTeammates.data.teamDetails[0].members_number}
              <br />
              Average Cgpa: {fetchAllTeammates.data.teamDetails[0].avg_cgpa}
              <br />
              Current Semester: {fetchAllTeammates.data.teamDetails[0].semester}
            </p>
            <div className="grid grid-cols-1 gap-4">
              {fetchAllTeammates.data.AllTeammateDetails.map(
                (student, index) => (
                  <div
                    key={student.enrollment_id}
                    className="bg-gray-500 p-4 rounded-lg"
                  >
                    <h3 className="text-lg font-bold mb-2">
                      Member {index + 1}{' '}
                      {student.enrollment_id ===
                        fetchAllTeammates.data.teamDetails[0].team_id && (
                        <span className="text-red-500">(Leader)</span>
                      )}
                    </h3>
                    <p className="text-md">
                      Enrollment Id: {student.enrollment_id}
                    </p>
                    <p className="text-md">
                      Name: {student.first_name} {student.last_name}
                    </p>
                    <p className="text-md">
                      Gsuite Email Id: {student.gsuite_email}
                    </p>
                    <p className="text-md">Cgpa: {student.cgpa}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </section>

      <section>
        <h1>set preferences</h1>
        <button
          className="bg-blue-500 rounded-lg text-white font-mono text-md font-medium px-5 py-2.5 hover:bg-blue-600"
          onClick={() => {
            handleSetPreferences()
            setShowModal(true)
          }}
        >
          click here to set preferences
        </button>
        <div>
          {fetchAllTeammates.data && (
            <Modal isVisible={showModal} onClose={onClose}>
              <ProjectPreferences
                teamDetails={fetchAllTeammates.data.teamDetails[0]}
                userDetails={userDetails}
                onClose={onClose}
                isLeader={isLeader}
              />
            </Modal>
          )}
        </div>
      </section>
    </div>
  )
}

export default Student
