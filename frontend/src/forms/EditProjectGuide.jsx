/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editProjectGuide } from '../api/guide'
import { DEPARTMENT_NAME_WITH_ID, ToastMessageType } from '../variables'
import { useAppContext } from '../hooks/useContextHooks'
// eslint-disable-next-line react/prop-types
function EditProjectGuide({ guide, onClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const { showToast } = useAppContext()
  const queryClient = useQueryClient()
  useEffect(() => {
    if (guide) {
      setValue('guideId', guide.guide_id)
      setValue('email', guide.email)
      setValue('firstName', guide.first_name)
      setValue('lastName', guide.last_name)
      setValue('department', guide.dept_id)
    }
  }, [guide, setValue])

  const mutation = useMutation({
    mutationFn: (data) => editProjectGuide(guide.guide_id, data),
    onSuccess: async () => {
      onClose()
      queryClient.invalidateQueries(['projectGuides'])
      showToast({
        message: 'Successfully updated Project guide',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      onClose()
      showToast({
        message: error.message,
        type: ToastMessageType.error,
      })
      console.log(error)
    },
  })

  const onSubmit = handleSubmit((data) => {
    // console.log(data)
    mutation.mutate(data)
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 m-1 shadow-lg bg-blue-100 p-2 rounded-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Edit Project Guide
      </h2>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Guide Id
        <input
          type="text"
          placeholder="Project Guide Id"
          className="border rounded w-full p-2 font-normal"
          {...register('guideId', { required: 'This field is required' })}
          disabled
        />
        {errors.guideId && (
          <span className="text-red-500">{errors.guideId.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full p-2 font-normal"
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        First Name
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register('firstName', { required: 'This field is required' })}
        />
        {errors.firstName && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Last Name
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register('lastName', { required: 'This field is required' })}
        />
        {errors.lastName && (
          <span className="text-red-500">{errors.lastName.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Department
        <select
          {...register('department', {
            required: 'This field is required',
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select Department for Project
          </option>
          {DEPARTMENT_NAME_WITH_ID.map((departmentName, index) => (
            <option
              value={departmentName.dept_id}
              key={index + 1}
              className="text-md py-2"
            >
              {departmentName.dept_name}
            </option>
          ))}
        </select>
        {errors.department && (
          <span className="text-red-500">{errors.department.message}</span>
        )}
      </label>

      <span className="flex items-center flex-col ">
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-7 font-bold hover:bg-blue-500  rounded-full md:px-8 lg:px-8 md:text-xl lg:text-xl hover:text-black place-self-end"
        >
          Update Guide
        </button>
      </span>
    </form>
  )
}

export default EditProjectGuide
