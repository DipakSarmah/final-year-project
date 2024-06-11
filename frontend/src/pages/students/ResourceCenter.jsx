/* eslint-disable react/prop-types */

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchResourcesByTeamAndGuide } from '../../api/student'
import { useAppContext } from '../../hooks/useContextHooks'

function StudentResourceCenter() {
  const { projectDetails } = useAppContext()
  const [teamId, setTeamId] = useState(projectDetails.team_id)
  const [guideId, setGuideId] = useState(projectDetails.guide_id)
  const [isFetching, setIsFetching] = useState(false)
  const [toggleState, setToggleState] = useState(false)
  const { data, isLoading, error } = useQuery({
    queryKey: ['resources', teamId, guideId],
    queryFn: () => fetchResourcesByTeamAndGuide(teamId, guideId),
    // enabled: !!teamId && !!guideId ,
  })

  const handleFetchResources = () => {
    setToggleState((prev) => !prev)
    // setIsFetching(true)
    // setTeamId(projectDetails.team_id)
    // setGuideId(projectDetails.guideId)
    // setIsFetching(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Student Resource Center
      </h2>
      <div className="space-y-4 bg-white p-6 shadow-lg rounded-lg">
        <div>
          <p className="text-gray-700 mb-4">
            Here you can find all the resources uploaded by your guide for your
            team. Click on the file name to open or download the resource.
          </p>
          <label className="block text-gray-700 font-medium mb-2">
            Team ID
          </label>
          <input
            type="text"
            value={projectDetails.team_id}
            onChange={(e) => setTeamId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none p-2"
            required
            disabled
          />
        </div>
        <button
          onClick={handleFetchResources}
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
        >
          Fetch Resources
        </button>
      </div>

      {isFetching && isLoading && (
        <div className="mt-4 text-center">Loading...</div>
      )}
      {error && (
        <div className="mt-4 text-center text-red-500">
          Error fetching resources: {error.message}
        </div>
      )}
      {data && data.resources.length === 0 && (
        <div className="mt-4 text-center text-red-500">
          No resources available
        </div>
      )}
      {toggleState && data && data.resources.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Uploaded Resources</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                    File Name (Click to Open)
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.resources.map((file) => (
                  <tr key={file.team_file_id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {file.file_name}
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {file.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentResourceCenter
