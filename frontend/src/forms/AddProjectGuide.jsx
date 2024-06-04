import { useForm } from 'react-hook-form'
import {
  useMutation,
  // useQueryClient,
} from '@tanstack/react-query'
import { addProjectGuide } from '../api/guide'
import { DEPARTMENT_NAME_WITH_ID } from '../variables'
import { useAppContext } from '../hooks/useContextHooks'
import { ToastMessageType } from '../variables'

// eslint-disable-next-line react/prop-types
function AddProjectGuide({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { showToast } = useAppContext()

  const mutation = useMutation({
    mutationFn: addProjectGuide,
    onSuccess: async () => {
      onClose()
      showToast({
        message: 'Successfully added Project guide ',
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
    console.log(data)
    mutation.mutate(data)
  })
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 m-1 shadow-lg bg-blue-100 p-2 rounded-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Add Project Guide
      </h2>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Guide Id
        <input
          type="text"
          placeholder="Project Guide Id"
          className="border rounded w-full p-2 font-normal"
          {...register('guideId', { required: 'This field is required' })}
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
          Create Account
        </button>
      </span>
    </form>
  )
}

export default AddProjectGuide
