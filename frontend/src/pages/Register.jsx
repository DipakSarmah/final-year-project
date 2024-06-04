import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
  useMutation,
  // useQueryClient,
} from '@tanstack/react-query'
import * as apiClient from '../apiClient'
import { useNavigate } from 'react-router-dom'
import { Roles, ToastMessageType } from '../variables'
import { useAppContext } from '../hooks/useContextHooks'

function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const { showToast, login } = useAppContext()
  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async (res) => {
      // console.log('registration successful')

      login(res.userDetails, res.token, res.role)
      showToast({
        message: 'Registered Successful!',
        type: ToastMessageType.success,
      })
      if (res.role === 'Student') {
        navigate('/student')
      } else if (res.role === 'Guide') {
        navigate('/guide')
      } else {
        navigate('/admin')
      }
    },
    onError: (error) => {
      // console.log(error)
      showToast({
        message: error.message,
        type: ToastMessageType.error,
      })
    },
  })
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 m-1 shadow-lg bg-blue-100 p-3 md:p-10 lg:mx-52  lg:p-24 rounded-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">Register</h2>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        User Id
        <input
          type="text"
          placeholder="Enrollment id / Project guide id"
          className="border rounded w-full p-2 font-normal"
          {...register('userId', { required: 'This field is required' })}
        />
        {errors.userId && (
          <span className="text-red-500">{errors.userId.message}</span>
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

      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Role
        <select
          {...register('role', {
            required: 'This field is required',
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select User Role
          </option>
          {Roles.map((num) => (
            <option value={num} key={num} className="text-md py-2">
              {num}
            </option>
          ))}
        </select>
        {errors.role && (
          <span className="text-red-500">{errors.role.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full p-2 font-normal"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be atleast 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-lg w-full font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full p-2 font-normal"
          {...register('confirmPassword', {
            validate: (val) => {
              if (!val) {
                return 'This field is required'
              } else if (watch('password') !== val) {
                return 'Your Passwords do not match'
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Already Registered?{' '}
          <Link to="/sign-in" className="underline">
            Sign In here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-7 font-bold hover:bg-blue-500  rounded-full md:px-8 lg:px-8 md:text-xl lg:text-xl hover:text-black"
        >
          Create Account
        </button>
      </span>
    </form>
  )
}

export default Register
