import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { handleFetchAllTeammates } from '../api/student'
import { useState } from 'react'
function Student() {
  const navigate = useNavigate()
  const [isFetchTeam, setIsFetchTeam] = useState(false)

  const enrolliD = 'CSB20084'
  const sem = 8
  const cgpa = 9.12

  const fetchAllTeammates = useQuery({
    queryKey: ['team-members'],
    queryFn: () => handleFetchAllTeammates(enrolliD),
    enabled: isFetchTeam,
  })

  const handlefetchteammates = () => {
    setIsFetchTeam((isFetchTeam) => !isFetchTeam)
    console.log('clicked', isFetchTeam)
    if (!isFetchTeam) {
      fetchAllTeammates.refetch()
    }
  }

  // return (
  //   <div className="bg-blue-200">
  //     <h1 className="text-xl font-bold mb-4 text-center">
  //       Welcome {enrolliD},<br /> Semester: {sem}
  //       <br /> Cgpa: {cgpa}
  //     </h1>
  //     <section className="bg-slate-200 p-2 mb-3">
  //       <div>
  //         <p className="text-xl font-sans text-pretty">
  //           You wanna see your team or add member to your team? go to team page
  //           to control team.
  //         </p>
  //         <button
  //           className="bg-black rounded-lg text-white font-mono text-md font-medium px-5 py-2.5 "
  //           onClick={() => navigate('/student/team')}
  //         >
  //           Go to teams page
  //         </button>
  //       </div>
  //     </section>
  //     <section className="bg-slate-300 p-2">
  //       <p className="text-xl font-bold text-pretty font-sans">
  //         your current team members are:
  //       </p>
  //       <button
  //         className="bg-black text-white rounded-md p-2 font-mono"
  //         onClick={() => handlefetchteammates(enrolliD)}
  //       >
  //         See Your Teammates
  //       </button>

  //       {fetchAllTeammates.isLoading && <p>Loading...</p>}
  //       {fetchAllTeammates.error && (
  //         <p>Error: {fetchAllTeammates.error.message}</p>
  //       )}
  //       {isFetchTeam && fetchAllTeammates.data && (
  //         <div className="flex flex-col justify-center items-center">
  //           <div className="bg-slate-400 w-full p-2 rounded-md mt-2">
  //             <h1 className="text-xl font-bold">Team details: </h1>
  //             <h1 className="text-xl font-bold text-pretty">
  //               Team Id: {fetchAllTeammates.data.teamDetails[0].team_id} No of
  //               members: {fetchAllTeammates.data.teamDetails[0].members_number}{' '}
  //               Average Cgpa: {fetchAllTeammates.data.teamDetails[0].avg_cgpa}{' '}
  //               Current Semester:{' '}
  //               {fetchAllTeammates.data.teamDetails[0].semester}
  //             </h1>
  //             <div className='flex flex-col'>
  //               {fetchAllTeammates.data.AllTeammateDetails.map(
  //                 (student, index) => (
  //                   <div key={student.enrollment_id} className='bg-slate-500 p-2 rounded-sm m-1'>
  //                     Member {index + 1}{' '}
  //                     {student.enrollment_id ===
  //                     fetchAllTeammates.data.teamDetails[0].team_id ? (
  //                       <span>(Leader)</span>
  //                     ) : (
  //                       ' '
  //                     )}
  //                     <div>Enrollment Id: {student.enrollment_id}</div>
  //                     <div>
  //                       Name : {student.first_name}
  //                       {''}
  //                       {student.last_name}
  //                     </div>
  //                     <div>Gsuite Email Id: {student.gsuite_email}</div>
  //                     <div>Cgpa: {student.cgpa}</div>
  //                   </div>
  //                 )
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </section>
  //   </div>
  // )

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

        {fetchAllTeammates.isLoading && <p>Loading...</p>}
        {fetchAllTeammates.error && (
          <p>Error: {fetchAllTeammates.error.message}</p>
        )}

        {isFetchTeam && fetchAllTeammates.data && (
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
    </div>
  )
}

export default Student
