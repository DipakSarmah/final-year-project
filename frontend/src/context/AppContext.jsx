/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'
import Toast from '../components/Toast'
import { useQueryClient } from '@tanstack/react-query'

export const AppContext = createContext(null)

export const AppContextProvider = ({ children, navigate }) => {
  const [toast, setToast] = useState()
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userDetails'))
  )
  const [token, setToken] = useState(localStorage.getItem('userInfo'))
  const [role, setRole] = useState(localStorage.getItem('role'))
  const [isProjectAllocatedForStudent, setIsProjectAllocated] = useState(false)
  const [projectDetails, setProjectDetails] = useState('')

  const queryClient = useQueryClient()
  useEffect(() => {
    const storedUser = localStorage.getItem('userDetails')
    if (storedUser) {
      // console.log('User Details from localStorage:', JSON.parse(storedUser)) // Add this line
      setUser(JSON.parse(storedUser))
    } else {
      console.log('No user details found in localStorage') // Add this line
    }

    const UserToken = localStorage.getItem('userInfo')
    if (UserToken) {
      // console.log('User Token from localStorage:', UserToken) // Add this line
      setToken(UserToken)
    } else {
      console.log('No user token found in localStorage') // Add this line
    }

    const UserRole = localStorage.getItem('role')
    if (UserRole) {
      // console.log('User Role from localStorage:', UserRole) // Add this line
      setRole(UserRole)
    } else {
      console.log('No user role found in localStorage') // Add this line
    }
  }, [])

  const login = (userData, token, role) => {
    localStorage.setItem('userDetails', JSON.stringify(userData))
    localStorage.setItem('userInfo', token)
    localStorage.setItem('role', role)
    setUser(userData)
    setRole(role)
    setToken(token)
  }
  const updatedIsProjectAllocationForStudent = (
    isallocated,
    projectDetails
  ) => {
    setIsProjectAllocated(isallocated)
    setProjectDetails(projectDetails)
  }

  const logout = () => {
    localStorage.removeItem('userDetails')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('role')
    setUser(null)
    setRole(null)
    setToken(null)
    setProjectDetails(null)
    setIsProjectAllocated(false)
    queryClient.clear()
    navigate('/')
  }
  return (
    <AppContext.Provider
      value={{
        user,
        login,
        projectDetails,
        isProjectAllocatedForStudent,
        updatedIsProjectAllocationForStudent,
        token,
        role,
        logout,
        showToast: (toastMessage) => {
          setToast(toastMessage)
        },
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  )
}
