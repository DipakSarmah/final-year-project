/* eslint-disable react/prop-types */

import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchUnallottedProjects } from './../../api/project'
import { storePreferences } from './../../api/student'
import { ToastMessageType } from '../../variables'
import { useAppContext } from '../../hooks/useContextHooks'

// eslint-disable-next-line react/prop-types
const ProjectPreferences = ({
  userDetails,
  teamDetails,
  onClose,
  isLeader,
}) => {
  const [selectedPreferences, setSelectedPreferences] = useState(['', '', ''])
  const { showToast } = useAppContext()

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['unallottedProjects', userDetails],
    queryFn: () => fetchUnallottedProjects(userDetails),
    enabled: isLeader,
  })

  const teamPreferenceMutation = useMutation({
    mutationFn: storePreferences,
    onSuccess: () => {
      alert('Preferences saved successfully')
      onClose()
      showToast({
        message: 'Preferences saved successfully',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      showToast({
        message: error.message,
        type: ToastMessageType.error,
      })
    },
  })

  const handlePreferenceChange = (index, value) => {
    const newPreferences = [...selectedPreferences]
    newPreferences[index] = value
    setSelectedPreferences(newPreferences)
    console.log(newPreferences)
  }

  const handleSubmit = () => {
    const hasEmptyPreferences = selectedPreferences.some((pref) => pref === '')

    if (hasEmptyPreferences) {
      onClose()
      showToast({
        message: 'Please select all three preferences before submitting.',
        type: ToastMessageType.error,
      })
      return
    }
    teamPreferenceMutation.mutate({
      teamId: teamDetails.team_id,
      preferences: selectedPreferences,
    })

    console.log(selectedPreferences)
    console.log(teamDetails.team_id)
    onClose()
  }

  if (projectsLoading) return <div>Loading...</div>

  if (!isLeader)
    return (
      <div className="text-black">
        <p className="mb-4">
          You are not the Leader. Ask your leader to fill the preferences.
        </p>
        <button
          className="bg-gray-500 rounded-lg text-white font-mono text-md font-medium px-5 py-2.5"
          disabled
        >
          Give Preference
        </button>
      </div>
    )

  return (
    <div className="text-black p-4 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Select Your Project Preferences
      </h2>
      <div className="flex flex-col space-y-4 mb-4">
        {selectedPreferences.map((pref, index) => (
          <div key={index + 1}>
            <label className="block mb-2 font-medium">
              Preference {index + 1}
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={pref}
              onChange={(e) => handlePreferenceChange(index, e.target.value)}
            >
              <option value="">Select a project</option>
              {projects
                .filter(
                  (project) => !selectedPreferences.includes(project.project_id)
                )
                .map((project) => (
                  <option key={project.project_id} value={project.project_id}>
                    {project.project_name}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 rounded-lg text-white font-mono text-md font-medium px-5 py-2.5 hover:bg-blue-600 transition duration-300"
        onClick={handleSubmit}
      >
        Submit Preferences
      </button>
    </div>
  )
}

export default ProjectPreferences
