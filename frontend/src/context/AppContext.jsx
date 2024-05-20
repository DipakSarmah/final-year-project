/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import Toast from '../components/Toast'
// import { useQuery } from '@tanstack/react-query'

export const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState()
  // const { isError } = useQuery('validateToken', apiClient.validateToken, {
  //   retry: false,
  // })
  return (
    <AppContext.Provider
      value={{
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
