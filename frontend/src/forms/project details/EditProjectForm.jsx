/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from './../../api/project' // Adjust the import path according to your project structure
import { useAppContext } from './../../hooks/useContextHooks'
import {
  ToastMessageType,
  COURSES,
  DEPARTMENT_NAME_WITH_ID,
} from './../../variables'

function EditProjectForm({ project, onClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm()
  const { showToast, role } = useAppContext()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (project) {
      setValue('project_name', project.project_name)
      setValue('project_id', project.project_id)
      setValue('project_description', project.project_description)
      setValue('project_start_date', project.project_start_date)
      setValue('project_end_date', project.project_end_date)
      setValue('project_tagname', project.project_tagname)
      setValue('department_name', project.department_name)
      setValue('semester', project.semester)
      setValue('guide_id', project.guide_id)
      setValue('team_id', project.team_id)
      setValue('allotted_type', project.allotted_type)
      setValue('course', project.course)
    }
  }, [project, setValue])

  const mutation = useMutation({
    mutationFn: (data) => updateProject(project.project_id, data),
    onSuccess: async (res) => {
      console.log(res)
      onClose()
      queryClient.invalidateQueries(['projects'])
      showToast({
        message: 'Successfully updated the project detail',
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
    mutation.mutate(data)
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 m-1 shadow-lg bg-blue-100 p-2 rounded-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Edit Project Details
      </h2>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project Name
        <input
          type="text"
          placeholder="Project Name"
          className="border rounded w-full p-2 font-normal"
          {...register('project_name', { required: 'This field is required' })}
        />
        {errors.project_name && (
          <span className="text-red-500">{errors.project_name.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project ID
        <input
          type="text"
          placeholder="Project ID"
          className="border rounded w-full p-2 font-normal"
          {...register('project_id', {
            required: 'This field is required',
            maxLength: {
              value: 10,
              message: 'Max length of Project Id is 10 only',
            },
          })}
          disabled
        />
        {errors.project_id && (
          <span className="text-red-500">{errors.project_id.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project Description
        <textarea
          placeholder="Project Description"
          className="border rounded w-full p-2 font-normal"
          {...register('project_description', {
            required: 'This field is required',
          })}
        />
        {errors.project_description && (
          <span className="text-red-500">
            {errors.project_description.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project Start Date
        <input
          type="date"
          className="border rounded w-full p-2 font-normal"
          {...register('project_start_date', {
            required: 'This field is required',
          })}
        />
        {errors.project_start_date && (
          <span className="text-red-500">
            {errors.project_start_date.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project End Date
        <input
          type="date"
          className="border rounded w-full p-2 font-normal"
          {...register('project_end_date', {
            required: 'This field is required',
          })}
        />
        {errors.project_end_date && (
          <span className="text-red-500">
            {errors.project_end_date.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Project Tag Name
        <input
          type="text"
          placeholder="Project Tag Name"
          className="border rounded w-full p-2 font-normal"
          {...register('project_tagname', {
            required: 'This field is required',
          })}
        />
        {errors.project_tagname && (
          <span className="text-red-500">{errors.project_tagname.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Department
        <select
          {...register('department_name', {
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
        {errors.department_name && (
          <span className="text-red-500">{errors.department_name.message}</span>
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
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Guide ID
        <input
          type="text"
          placeholder="Guide ID"
          className="border rounded w-full p-2 font-normal"
          {...register('guide_id', { required: 'This field is required' })}
          disabled={role === 'Guide'}
        />
        {errors.guide_id && (
          <span className="text-red-500">{errors.guide_id.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Team ID
        <input
          type="text"
          placeholder="Team ID"
          className="border rounded w-full p-2 font-normal"
          {...register('team_id')}
        />
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Allotted Type
        <select
          {...register('allotted_type', {
            validate: (value) => {
              if (watch('team_id') && !value) {
                return 'This field is required'
              }
              return true
            },
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-lg font-bold">
            Select Allotted Type
          </option>
          <option value={'MANUAL'} className="text-md py-2">
            {'Manual'}
          </option>
        </select>
        {errors.allotted_type && (
          <span className="text-red-500">{errors.allotted_type.message}</span>
        )}
      </label>

      <span className="flex items-center flex-col">
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-7 font-bold hover:bg-blue-500 rounded-full md:px-8 lg:px-8 md:text-xl lg:text-xl hover:text-black place-self-end"
        >
          Update Project
        </button>
      </span>
    </form>
  )
}

export default EditProjectForm
