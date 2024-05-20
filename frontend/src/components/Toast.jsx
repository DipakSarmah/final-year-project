/* eslint-disable react/prop-types */

import { useEffect } from 'react'

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [onClose])

  const style =
    type === 'SUCCESS'
      ? 'fixed top-20 right-20 z-50 py-4 px-8 rounded-md bg-yellow-600 text-white max-w-md'
      : 'fixed top-20 right-20 left-[50%]z-50 py-4 px-8 rounded-md bg-red-600 text-white max-w-md'
  return (
    <div className={style}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  )
}
export default Toast
