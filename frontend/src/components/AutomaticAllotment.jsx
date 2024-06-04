
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  automaticAllotment,
  fetchDepartments,
  confirmAllotment,
} from '../api/admin'
import { useAppContext } from '../hooks/useContextHooks'
import Modal from './../components/Modal'

function AutomaticAllotment() {
  const { showToast, role } = useAppContext()
  const [selectedDeptId, setSelectedDeptId] = useState('')
  const [allotmentData, setAllotmentData] = useState([])
  const [showModal, setShowModal] = useState(false)
  // const [alreadyAllotedTeam, setAlreadyAllotedTeam] = useState({})
  const { data, isLoading, error } = useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  })
  const departments = data?.data || []

  const allotmentMutation = useMutation({
    mutationFn: automaticAllotment,
    onSuccess: (data) => {
      setAllotmentData(data)
      showToast({
        message: 'Allotment data fetched successfully',
        type: 'SUCCESS',
      })
      setShowModal(true)
    },
    onError: (error) => {
      console.error('Error performing allotment:', error)
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const confirmationMutation = useMutation({
    mutationFn: confirmAllotment,
    onSuccess: (data) => {
      setShowModal(false)
      showToast({
        message: 'Allotment confirmed successfully',
        type: 'SUCCESS',
      })
      setAllotmentData([]) // Clear allotment data after confirmation
      setAllotmentData(data)
    },
    onError: (error) => {
      console.error('Error confirming allotment:', error)
      setShowModal(false)
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const handleAllotment = () => {
    if (selectedDeptId) {
      allotmentMutation.mutate(selectedDeptId)
    } else {
      showToast({ message: 'Please select a department', type: 'error' })
    }
  }

  const handleAllotmentConfirmation = () => {
    confirmationMutation.mutate(allotmentData)
  }

  const handleAllotmentRejection = () => {
    setAllotmentData([])
    showToast({
      message: 'Allotment rejected successfully',
      type: 'SUCCESS',
    })
    setShowModal(false)
  }

  if (role !== 'Admin') {
    return (
      <div className="text-2xl text-yellow-300 text-center font-sans font-bold">
        Please Log in As an Admin to see this functionality
      </div>
    )
  }
  if (isLoading)
    return (
      <div className="text-xl font-sans font-bold text-yellow-300">
        Loading departments...
      </div>
    )
  if (error)
    return (
      <div className="text-xl font-sans font-bold text-red-500">
        Error: {error.message}
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      {role === 'Admin' && (
        <div className="p-8 bg-slate-200 rounded">
          <h1 className="text-4xl font-bold mb-8">
            Automatic Project Allotment
          </h1>
          <select
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAllotment}
            className="bg-blue-500 text-white font-mono text-md font-medium px-5 py-2.5 rounded-lg mb-6"
          >
            Start Allotment
          </button>
        </div>
      )}

      {allotmentData && (
        <Modal onClose={() => setShowModal(false)} isVisible={showModal}>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Allotment Confirmation:</h2>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b font-semibold text-gray-700">
                    Team ID
                  </th>
                  <th className="py-2 px-4 border-b font-semibold text-gray-700">
                    Project ID
                  </th>
                  <th className="py-2 px-4 border-b font-semibold text-gray-700">
                    Project Title
                  </th>
                  <th className="py-2 px-4 border-b font-semibold text-gray-700">
                    Guide ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {allotmentData.map((allotment) => (
                  <tr key={allotment.project_id}>
                    <td className="py-2 px-4 border-b">
                      {allotment.team_name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {allotment.project_id}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {allotment.project_title}
                    </td>
                    <td className="py-2 px-4 border-b">{allotment.guide_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleAllotmentConfirmation}
                className="bg-blue-500 text-white font-mono text-md font-medium px-5 py-2.5 rounded-lg"
              >
                Confirm Allotment
              </button>
              <button
                onClick={handleAllotmentRejection}
                className="bg-red-500 text-white font-mono text-md font-medium px-5 py-2.5 rounded-lg"
              >
                Reject Allotment
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default AutomaticAllotment
