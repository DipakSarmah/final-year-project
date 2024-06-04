/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStudent } from '../api/student' // Adjust the import path according to your project structure
import { DEPARTMENT_NAME_WITH_ID, ToastMessageType } from '../variables' // Adjust the import path according to your project structure
import { useAppContext } from '../hooks/useContextHooks'

function EditStudentForm({ student, onClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const { showToast } = useAppContext()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (student) {
      setValue('enrollment_id', student.enrollment_id)
      setValue('gsuite_email', student.gsuite_email)
      setValue('cgpa', student.cgpa)
      setValue('first_name', student.first_name)
      setValue('last_name', student.last_name)
      setValue('register_data', student.register_data)
      setValue('sem', student.sem)
      setValue('admission_year', student.admission_year)
      setValue('gender', student.gender)
      setValue('profile_picture_url', student.profile_picture_url)
      setValue('status', student.status)
      setValue('course', student.course)
      setValue('department', student.department)
    }
  }, [student, setValue])

  const mutation = useMutation({
    mutationFn: (data) => updateStudent(student.enrollment_id, data),
    onSuccess: async () => {
      onClose()
      queryClient.invalidateQueries(['students'])
      showToast({
        message: 'Successfully updated student',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      onClose()
      showToast({
        message: error.message,
        type: ToastMessageType.error,
      })
      console.error(error)
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
        Edit Student
      </h2>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Enrollment ID
        <input
          type="text"
          placeholder="Enrollment ID"
          className="border rounded w-full p-2 font-normal"
          {...register('enrollment_id', { required: 'This field is required' })}
          disabled
        />
        {errors.enrollment_id && (
          <span className="text-red-500">{errors.enrollment_id.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full p-2 font-normal"
          {...register('gsuite_email', { required: 'This field is required' })}
        />
        {errors.gsuite_email && (
          <span className="text-red-500">{errors.gsuite_email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        CGPA
        <input
          type="number"
          step="0.01"
          className="border rounded w-full p-2 font-normal"
          {...register('cgpa', { required: 'This field is required' })}
        />
        {errors.cgpa && (
          <span className="text-red-500">{errors.cgpa.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        First Name
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register('first_name', { required: 'This field is required' })}
        />
        {errors.first_name && (
          <span className="text-red-500">{errors.first_name.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Last Name
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register('last_name', { required: 'This field is required' })}
        />
        {errors.last_name && (
          <span className="text-red-500">{errors.last_name.message}</span>
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
            Select Department
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
      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Semester
        <input
          type="number"
          className="border rounded w-full p-2 font-normal"
          {...register('sem', { required: 'This field is required' })}
        />
        {errors.sem && (
          <span className="text-red-500">{errors.sem.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Admission Year
        <input
          type="number"
          className="border rounded w-full p-2 font-normal"
          {...register('admission_year', {
            required: 'This field is required',
          })}
        />
        {errors.admission_year && (
          <span className="text-red-500">{errors.admission_year.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Gender
        <select
          {...register('gender', { required: 'This field is required' })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select Gender
          </option>
          <option value="Male" className="text-md py-2">
            Male
          </option>
          <option value="Female" className="text-md py-2">
            Female
          </option>
          <option value="Other" className="text-md py-2">
            Other
          </option>
        </select>
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Profile Picture URL
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register('profile_picture_url')}
        />
      </label>
      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Status
        <select
          {...register('status')}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="ACTIVE" className="text-md py-2">
            ACTIVE
          </option>
          <option value="INACTIVE" className="text-md py-2">
            INACTIVE
          </option>
        </select>
      </label>
      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Course
        <select
          {...register('course', {
            required: 'This field is required',
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="BTECH" className="text-md py-2">
            Bachelor of Technology
          </option>
          <option value="MTECH" className="text-md py-2">
            Master of Technology
          </option>
        </select>
        {errors.course && (
          <span className="text-red-500">{errors.course.message}</span>
        )}
      </label>

      <span className="flex items-center flex-col ">
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-7 font-bold hover:bg-blue-500 rounded-full md:px-8 lg:px-8 md:text-xl lg:text-xl hover:text-black place-self-end"
        >
          Update Student
        </button>
      </span>
    </form>
  )
}

export default EditStudentForm
