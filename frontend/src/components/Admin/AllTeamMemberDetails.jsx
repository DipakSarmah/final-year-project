/* eslint-disable react/prop-types */

function AllTeamMemberDetails({ allTeamMembers }) {
  return (
    <div className="flex justify-center items bg-center bg-slate-300 p-4 rounded">
      {(!allTeamMembers || allTeamMembers.length === 0) && (
        <div className="text-xl text-center text-red-500 font-bold">
          No Team Member to display
        </div>
      )}
      {allTeamMembers && (
        <div>
          {allTeamMembers.map((memberDetails) => (
            <div
              className="bg-slate-200 p-4 mb-4 rounded-md"
              key={memberDetails.enrollment_id}
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="text-xl text-pretty">
                  Name: {memberDetails.first_name} {memberDetails.last_name}
                </div>
                <div className="text-xl text-pretty">
                  Enrollment No: {memberDetails.enrollment_id}
                </div>
                <div className="text-xl text-pretty">
                  Email: {memberDetails.gsuite_email}
                </div>
                <div className="text-xl text-pretty">
                  CGPA: {memberDetails.cgpa}
                </div>
                <div className="text-xl text-pretty">
                  Gender: {memberDetails.gender}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllTeamMemberDetails
