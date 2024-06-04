import { useQuery } from '@tanstack/react-query'
import { useAppContext } from '../../hooks/useContextHooks'
import { fetchTeamsByGuide } from '../../api/guide'
import { TEAM_UNDER_GUIDE } from '../../variables'

function TeamHome() {
  const { user } = useAppContext()

  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['teams', user.guide_id],
    queryFn: () => fetchTeamsByGuide(user.guide_id),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-8">Teams Enrolled in Projects</h1>
      {teams && (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                {TEAM_UNDER_GUIDE.map((col) => (
                  <th
                    key={col}
                    className="py-2 px-4 border-b text-left font-semibold text-gray-700"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.team_id}>
                  <td className="py-2 px-4 border-b">{team.project_id}</td>
                  <td className="py-2 px-4 border-b">{team.project_name}</td>
                  <td className="py-2 px-4 border-b">{team.team_name}</td>
                  <td className="py-2 px-4 border-b">{team.team_id}</td>
                  <td className="py-2 px-4 border-b">{team.members_number}</td>
                  <td className="py-2 px-4 border-b">{team.avg_cgpa}</td>
                  <td className="py-2 px-4 border-b">{team.semester}</td>
                  <td className="py-2 px-4 border-b">
                    <button className='bg-black text-white p-1 font-bold text-pretty rounded-md'>Manage Team</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TeamHome
