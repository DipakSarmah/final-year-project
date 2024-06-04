import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchFiles, uploadFile, deleteFile } from '../../api/file'
import { useState } from 'react'
import { useAppContext } from './../../hooks/useContextHooks'
import { fetchTeamsByGuide } from '../../api/guide'

import { ToastMessageType } from './../../variables'
function ResourceCenter() {
  const { user, showToast } = useAppContext()
  const [selectedTeam, setSelectedTeam] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const {
    data: allTeamList,
    isLoading: teamLoading,
    error: teamFetchingError,
  } = useQuery({
    queryKey: ['teams', user.guide_id],
    queryFn: () => fetchTeamsByGuide(user.guide_id),
  })
  const queryClient = useQueryClient()

  const uploadMutation = useMutation({
    mutationFn: (data) => uploadFile(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['files', selectedTeam.team_id])
      reset()
      console.log('file uploaded successfully', data)
      showToast({
        message: 'successfully uploaded file.',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      console.error('Error uploading file:', error)
      showToast({ message: error.message, type: ToastMessageType.error })
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })
  const deleteMutation = useMutation({
    mutationFn: (data) => deleteFile(data.fileId, data.publicId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['files', selectedTeam.team_id])
      console.log('file deleted successfully', data)
      showToast({
        message: 'Successfully deleted file.',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      console.error('Error deleting file:', error)
      showToast({ message: error.message, type: ToastMessageType.error })
    },
  })

  const onSubmit = (data) => {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('teamId', selectedTeam.team_id)
    formData.append('guideId', user.guide_id)
    formData.append('description', data.description)
    uploadMutation.mutate(formData)
  }

  const handleTeamChange = (e) => {
    const selectedTeamName = e.target.value
    const selectedTeamDetails = allTeamList.find(
      (team) => team.team_name === selectedTeamName
    )
    setSelectedTeam(selectedTeamDetails)
  }
  const {
    data: files,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['files', user.guide_id],
    queryFn: () => fetchFiles(user.guide_id),
  })

  const handleDelete = (fileId, publicId) => {
    console.log('testing from handle delete: ', fileId, publicId)
    deleteMutation.mutate({ fileId, publicId })
  }
  if (isLoading) return <div>Loading...</div>

  if (teamLoading) return <div>Loading Team... Please wait</div>
  if (teamFetchingError) return <div>Error Loading Team details</div>
  if (error) return <div>Error fetching file details</div>

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Resource Center</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-4 shadow rounded-lg"
      >
        <div>
          <label className="block text-gray-700">File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 block w-full"
            required
            disabled={isSubmitting}
          />
          {errors.file && (
            <span className="text-red-500">{errors.file.message}</span>
          )}
        </div>
        <div>
          <label>
            Team
            <select
              {...register('teamName', {
                required: 'This field is required',
              })}
              onChange={handleTeamChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              disabled={isSubmitting}
            >
              <option value="" className="text-md py-2 font-bold">
                Select Team
              </option>
              {allTeamList.map((team, index) => (
                <option
                  value={team.team_name}
                  key={index + 1}
                  className="text-md py-2"
                >
                  {team.team_name}
                </option>
              ))}
            </select>
            {errors.teamName && (
              <span className="text-red-500">{errors.teamName.message}</span>
            )}
          </label>
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register('description', {
              required: 'Description is required',
            })}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            disabled={isSubmitting}
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <h3 className="text-xl font-bold mt-8">Uploaded Files</h3>
      {files.length === 0 ? (
        <div className="text-2xl font-bold text-red-400">No Files To Show</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Team Leader
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  File Name (Click to Open)
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.team_file_id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {file.team_id}
                  </td>
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
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition duration-200"
                      onClick={() =>
                        handleDelete(file.team_file_id, file.public_id)
                      }
                    >
                      Delete
                    </button>
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

export default ResourceCenter
