/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendEmails } from '../../api/guide'
import { useState } from 'react'
import { useAppContext } from './../../hooks/useContextHooks'
import { ToastMessageType } from '../../variables'

function AppointmentEmailForm({ user, allTeamList }) {
  const queryClient = useQueryClient()
  const [selectedTeam, setSelectedTeam] = useState({})
  const { showToast } = useAppContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const mutation = useMutation({
    mutationFn: sendEmails,
    onSuccess: () => {
      showToast({
        message: 'Email successfully sent for Appointment to team.',
        type: ToastMessageType.success,
      })
      queryClient.invalidateQueries(['guideDetails'])
      resetForm()
    },
    onError: (error) => {
      console.error('Error sending emails:', error)
      showToast({
        message: error.message,
        type: ToastMessageType.error,
      })
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    if (user) {
      setIsSubmitting(true)
      const guideId = user.guide_id
      const guideEmail = user.email
      const guideName = `${user.first_name} ${user.last_name}`
      const teamId = selectedTeam.team_id
      const teamName = selectedTeam.team_name
      data = { ...data, guideId, guideEmail, guideName, teamId, teamName }
      mutation.mutate(data)
    }
  })

  const handleTeamChange = (e) => {
    const selectedTeamName = e.target.value
    const selectedTeamDetails = allTeamList.find(
      (team) => team.team_name === selectedTeamName
    )
    setSelectedTeam(selectedTeamDetails)
  }

  const resetForm = () => {
    reset()
    setSelectedTeam({})
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">
          Appointment Date and Time
          <input
            type="datetime-local"
            className="w-full border border-gray-300 p-2 rounded mt-1"
            {...register('appointmentDateTime', {
              required: 'This field is required',
            })}
          />
          {errors.appointmentDateTime && (
            <span className="text-red-500">
              {errors.appointmentDateTime.message}
            </span>
          )}
        </label>
      </div>
      <div>
        <label className="block text-gray-700">
          Subject
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded mt-1"
            {...register('subject', { required: 'This field is required' })}
          />
          {errors.subject && (
            <span className="text-red-500">{errors.subject.message}</span>
          )}
        </label>
      </div>
      <div>
        <label className="block text-gray-700">
          Message
          <textarea
            className="w-full border border-gray-300 p-2 rounded mt-1"
            {...register('message', { required: 'This field is required' })}
            disabled={isSubmitting}
          ></textarea>
          {errors.message && (
            <span className="text-red-500">{errors.message.message}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Team
          <select
            {...register('teamName', {
              required: 'This field is required',
            })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            onChange={handleTeamChange}
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

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Emails'}
        </button>
      </div>
    </form>
  )
}

export default AppointmentEmailForm
