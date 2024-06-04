import { useState } from 'react'
import AddProjectGuide from '../../forms/AddProjectGuide'
import Modal from '../../components/Modal'
import { GUIDECOLUMN, ToastMessageType } from '../../variables'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchProjectGuides, deleteProjectGuide } from '../../api/guide'
import { useAppContext } from '../../hooks/useContextHooks'
import EditProjectGuide from '../../forms/EditProjectGuide'

function GuideCrud() {
  const [addGuide, setAddGuide] = useState(false)

  const { showToast } = useAppContext()

  const [openDeleteGuideModal, setOpenDeleteGuideModal] = useState(false)
  const [deleteGuideId, setDeleteGuideId] = useState('')
  const [openEditGuideModal, setOpenEditGuideModal] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [localSearch, setLocalSearch] = useState('')
  const [localSortBy, setLocalSortBy] = useState('first_name')
  const [localSortOrder, setLocalSortOrder] = useState('asc')

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('first_name')
  const [sortOrder, setSortOrder] = useState('asc')

  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: deleteProjectGuide,
    onSuccess: () => {
      setOpenDeleteGuideModal(false)
      queryClient.invalidateQueries(['projectGuides'])
      showToast({
        message: 'successfully removed the project guide details',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      setOpenDeleteGuideModal(false)
      showToast({
        message: error.message,
        type: ToastMessageType.error,
      })
      console.error('Error deleting the guide:', error)
    },
  })

  const {
    data: projectGuides,
    isLoading,
    error,
    refetch: refetchProjectGuide,
  } = useQuery({
    queryKey: ['projectGuides', search, sortBy, sortOrder],
    queryFn: () => fetchProjectGuides(search, sortBy, sortOrder),
    keepPreviousData: true,
  })

  const handleApplyFilters = () => {
    setSearch(localSearch)
    setSortBy(localSortBy)
    setSortOrder(localSortOrder)
    refetchProjectGuide()
  }

  const handleSearchChange = (e) => setLocalSearch(e.target.value)
  const handleSortByChange = (e) => setLocalSortBy(e.target.value)
  const handleSortOrderChange = (e) => setLocalSortOrder(e.target.value)

  const onClose = () => {
    refetchProjectGuide()
    setAddGuide(false)
  }

  const handleOpenEditModal = (guide) => {
    setSelectedGuide(guide)
    // setEditGuide(true)
    setOpenEditGuideModal(true)
  }

  const handleCloseDeleteGuideModal = () => {
    setOpenDeleteGuideModal(false)
  }
  const handleCloseEditGuideModal = () => {
    setOpenEditGuideModal(false)
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-8">Guide Management</h1>
      <p className="text-lg mb-4">
        As an admin, you can perform the following actions:
      </p>
      <ul className="list-disc list-inside text-left mb-8">
        <li>Create a new guide.</li>
        <li>Update guide details.</li>
        <li>Remove a guide from the database.</li>
        <li>View a list of all guides.</li>
      </ul>
      {/* Add your CRUD operations here */}

      <button
        className="bg-black text-white font-mono text-md font-medium px-5 py-2.5 rounded-lg mb-4"
        onClick={() => setAddGuide(true)}
      >
        Add New Project Guide
      </button>

      <div className="mb-4">
        <input
          type="text"
          value={localSearch}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="mb-2 p-2 border rounded"
        />
        <label htmlFor="sortBy" className="ml-2">
          Sort by:
        </label>
        <select
          id="sortBy"
          value={localSortBy}
          onChange={handleSortByChange}
          className="ml-2 p-2 border rounded"
        >
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="email">Email</option>
          <option value="dept_id">Department ID</option>
        </select>
        <label htmlFor="sortOrder" className="ml-2">
          Sort order:
        </label>
        <select
          id="sortOrder"
          value={localSortOrder}
          onChange={handleSortOrderChange}
          className="ml-2 p-2 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <button
        className="bg-blue-500 rounded-lg text-white font-mono text-md font-medium px-5 py-2.5 hover:bg-blue-600"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {projectGuides && (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                {GUIDECOLUMN.map((col) => (
                  <th
                    key={col}
                    className="py-2 px-4 border-b text-left font-semibold text-gray-700"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectGuides.map((guide) => (
                <tr key={guide.guide_id}>
                  <td className="py-2 px-4 border-b">{guide.email}</td>
                  <td className="py-2 px-4 border-b">{guide.first_name}</td>
                  <td className="py-2 px-4 border-b">{guide.last_name}</td>
                  <td className="py-2 px-4 border-b">{guide.guide_id}</td>
                  <td className="py-2 px-4 border-b">{guide.dept_id}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleOpenEditModal(guide)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setDeleteGuideId(guide.guide_id)
                        setOpenDeleteGuideModal(true)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isVisible={openDeleteGuideModal}
        onClose={handleCloseDeleteGuideModal}
      >
        <div>
          <h2 className="text-xl font-semibold mb-4">Delete Guide</h2>
          <p className="mb-6 text-red-600">
            <strong>Warning:</strong> Are you sure you want to delete the
            details of this project guide? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleCloseDeleteGuideModal}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              onClick={() => deleteMutation.mutate(deleteGuideId)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isVisible={openEditGuideModal} onClose={handleCloseEditGuideModal}>
        <EditProjectGuide
          guide={selectedGuide}
          onClose={handleCloseEditGuideModal}
        />
      </Modal>
      <Modal isVisible={addGuide} onClose={onClose}>
        <AddProjectGuide onClose={onClose} />
      </Modal>
    </div>
  )
}

export default GuideCrud
