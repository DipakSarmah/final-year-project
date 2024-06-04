import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks/useContextHooks'
import {
  useMutation,
  // useQueryClient,
} from '@tanstack/react-query'
import * as apiClient from '../apiClient'
import { useNavigate } from 'react-router-dom'

import { ToastMessageType } from '../variables'

function SignIn() {
  const navigate = useNavigate()
  const { showToast, login } = useAppContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const mutation = useMutation({
    mutationFn: apiClient.handlesignIn,
    onSuccess: async (res) => {
      console.log('signin successful')
      localStorage.setItem('role', res.role)

      login(res.userDetails, res.token, res.role)
      // showToast({message: 'Registration Success!',type: 'SUCCESS'})
      // await QueryClient.invalidateQueries('validateToken')
      //Always check if the item exists in localStorage before attempting to parse it. If the item is null, parsing it will throw an error.
      // Retrieving the object
      // Get the JSON string from localStorage
      //const retrievedUserString = localStorage.getItem('user');

      // Convert the JSON string back to an object
      //const retrievedUser = JSON.parse(retrievedUserString);

      showToast({
        message: 'Sign in Successful!',
        type: ToastMessageType.success,
      })
      if (res.role === 'Student') {
        navigate('/student')
      } else if (res.role === 'Guide') {
        navigate('/guide')
      } else if (res.role === 'Admin') {
        navigate('/admin')
      }
    },
    onError: (error) => {
      console.log(error)
      showToast({ message: error.message, type: ToastMessageType.error })
    },
  })
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 m-1 shadow-lg bg-blue-100 p-1 md:p-6 lg:mx-52 lg:p-24 rounded-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">Sign In</h2>
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
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{' '}
          <Link to="/register" className="underline">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 mt-7 font-bold hover:bg-blue-500  rounded-full px-8 text-xl hover:text-black"
        >
          Login
        </button>
      </span>
    </form>
  )
}

export default SignIn
