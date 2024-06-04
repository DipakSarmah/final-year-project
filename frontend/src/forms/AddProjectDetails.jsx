import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { handleAddNewProject } from './../api/project'
import { useAppContext } from '../hooks/useContextHooks'
import {
  ToastMessageType,
  COURSES,
  DEPARTMENT_NAME_WITH_ID,
} from './../variables'
// eslint-disable-next-line react/prop-types

// eslint-disable-next-line react/prop-types
function AddProjectDetails({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { showToast } = useAppContext()

  const mutation = useMutation({
    mutationFn: handleAddNewProject,
    onSuccess: async (res) => {
      console.log(res)
      onClose()
      showToast({
        message: 'Successfully added the project detail',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      console.log(error.message)
      onClose()
      showToast({ message: error.message, type: ToastMessageType.error })
    },
  })

  const onSubmit = handleSubmit((data) => {
    const userDetailsString = localStorage.getItem('userDetails')
    const userDetails = JSON.parse(userDetailsString)
    const guideId = userDetails.guide_id
    mutation.mutate({ ...data, guideId })
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 m-1 shadow-lg bg-blue-100 p-2 rounded-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Add Project Details
      </h2>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project Name
        <input
          type="text"
          placeholder="Project Name"
          className="border rounded w-full p-2 font-normal"
          {...register('projectName', { required: 'This field is required' })}
        />
        {errors.projectName && (
          <span className="text-red-500">{errors.projectName.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project ID
        <input
          type="text"
          placeholder="Project ID"
          className="border rounded w-full p-2 font-normal"
          {...register('projectId', { required: 'This field is required' })}
        />
        {errors.projectId && (
          <span className="text-red-500">{errors.projectId.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project Description
        <textarea
          placeholder="Project Description"
          className="border rounded w-full p-2 font-normal"
          {...register('projectDescription', {
            required: 'This field is required',
          })}
        />
        {errors.projectDescription && (
          <span className="text-red-500">
            {errors.projectDescription.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project Start Date
        <input
          type="date"
          className="border rounded w-full p-2 font-normal"
          {...register('projectStartDate', {
            required: 'This field is required',
          })}
        />
        {errors.projectStartDate && (
          <span className="text-red-500">
            {errors.projectStartDate.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project End Date
        <input
          type="date"
          className="border rounded w-full p-2 font-normal"
          {...register('projectEndDate', {
            required: 'This field is required',
          })}
        />
        {errors.projectEndDate && (
          <span className="text-red-500">{errors.projectEndDate.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project Tag Name
        <input
          type="text"
          placeholder="Project Tag Name"
          className="border rounded w-full p-2 font-normal"
          {...register('projectTagName', {
            required: 'This field is required',
          })}
        />
        {errors.projectTagName && (
          <span className="text-red-500">{errors.projectTagName.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Department
        <select
          {...register('departmentName', {
            required: 'This field is required',
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select Department Name
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
        {errors.departmentName && (
          <span className="text-red-500">{errors.departmentName.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Course Name
        <select
          {...register('course', {
            required: 'This field is required',
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-lg font-bold">
            Select Course Name
          </option>
          {COURSES.map((course, index) => (
            <option value={course} key={index + 1} className="text-md py-2">
              {course}
            </option>
          ))}
        </select>
        {errors.course && (
          <span className="text-red-500">{errors.course.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Semester
        <input
          type="number"
          placeholder="Semester"
          className="border rounded w-full p-2 font-normal"
          {...register('semester', {
            required: 'This field is required',
          })}
        />
        {errors.semester && (
          <span className="text-red-500">{errors.semester.message}</span>
        )}
      </label>
      <span className="flex items-center flex-col">
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-7 font-bold hover:bg-blue-500 rounded-full md:px-8 lg:px-8 md:text-xl lg:text-xl hover:text-black place-self-end"
        >
          Add Project
        </button>
      </span>
    </form>
  )
}

export default AddProjectDetails
