import { useState } from 'react'
import { useAppContext } from '../../hooks/useContextHooks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ToastMessageType } from '../../variables'
import { deleteStudent, fetchStudents } from '../../api/student'
import Modal from '../../components/Modal'
import AddStudentForm from '../../forms/AddStudentForm'
import EditStudentForm from '../../forms/EditStudent'
import { studentTableHeadersForAdmins } from '../../variables'

function StudentController() {
  const [addStudent, setAddStudent] = useState(false)
  const [editStudent, setEditStudent] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const { showToast, user, role } = useAppContext()

  const [openDeleteStudentModal, setOpenDeleteStudentModal] = useState(false)
  const [deleteStudentId, setDeleteStudentId] = useState('')
  const [localSearch, setLocalSearch] = useState('')
  const [localSortBy, setLocalSortBy] = useState('first_name')
  const [localSortOrder, setLocalSortOrder] = useState('asc')

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('first_name')
  const [sortOrder, setSortOrder] = useState('asc')

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      setOpenDeleteStudentModal(false)
      queryClient.invalidateQueries(['students'])
      showToast({
        message: 'Successfully removed the student details',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      setOpenDeleteStudentModal(false)
      showToast({
        message: error.message,
        type: ToastMessageType.error,
      })
      console.error('Error deleting the student:', error)
    },
  })

  const {
    data: students,
    isLoading,
    error,
    refetch: refetchStudents,
  } = useQuery({
    queryKey: ['students', search, sortBy, sortOrder, role, user.dept_id],
    queryFn: () =>
      fetchStudents(
        search,
        sortBy,
        sortOrder,
        user ? user.dept_id : null,
        role === 'Guide' ? 'Guide' : 'Admin'
      ),
    keepPreviousData: true,
  })

  const handleApplyFilters = () => {
    setSearch(localSearch)
    setSortBy(localSortBy)
    setSortOrder(localSortOrder)
    refetchStudents()
  }

  const handleSearchChange = (e) => setLocalSearch(e.target.value)
  const handleSortByChange = (e) => setLocalSortBy(e.target.value)
  const handleSortOrderChange = (e) => setLocalSortOrder(e.target.value)

  const onCloseAddStudent = () => {
    refetchStudents()
    setAddStudent(false)
  }

  const handleOpenEditModal = (student) => {
    setSelectedStudent(student)
    setEditStudent(true)
  }

  const handleCloseEditStudentModal = () => {
    setEditStudent(false)
  }

  const handleCloseDeleteStudentModal = () => {
    setOpenDeleteStudentModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-8">Student Management</h1>
      <p className="text-lg mb-4">
        As an admin, you can perform the following actions:
      </p>
      <ul className="list-disc list-inside text-left mb-10">
        <li>Create a new student.</li>
        <li>Update student details.</li>
        <li>Remove a student from the database.</li>
        <li>View a list of all students.</li>
      </ul>
      {/* Add your CRUD operations here */}

      <button
        className="bg-black text-white font-mono text-md font-medium px-5 py-2.5 rounded-lg mb-6"
        onClick={() => setAddStudent(true)}
      >
        Add New Student
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
          <option value="gsuite_email">Email</option>
          <option value="department">Department</option>
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
      {students && (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                {studentTableHeadersForAdmins.map((col) => (
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
              {students.map((student) => (
                <tr key={student.enrollment_id}>
                  <td className="py-2 px-4 border-b">
                    {student.enrollment_id}
                  </td>
                  <td className="py-2 px-4 border-b">{student.first_name}</td>
                  <td className="py-2 px-4 border-b">{student.last_name}</td>
                  <td className="py-2 px-4 border-b">{student.gsuite_email}</td>
                  <td className="py-2 px-4 border-b">{student.cgpa}</td>
                  <td className="py-2 px-4 border-b">{student.sem}</td>
                  <td className="py-2 px-4 border-b">{student.gender}</td>
                  <td className="py-2 px-4 border-b">{student.department}</td>
                  <td className="py-2 px-4 border-b">{student.course}</td>
                  <td className="py-2 px-4 border-b">
                    {student.admission_year
                      ? student.admission_year
                      : 'Not Filled'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.register_date
                      ? student.register_date
                      : 'Not Registered'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleOpenEditModal(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setDeleteStudentId(student.enrollment_id)
                        setOpenDeleteStudentModal(true)
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
        isVisible={openDeleteStudentModal}
        onClose={handleCloseDeleteStudentModal}
      >
        <div>
          <h2 className="text-xl font-semibold mb-4">Delete Student</h2>
          <p className="mb-6 text-red-600">
            <strong>Warning:</strong> Are you sure you want to delete the
            details of this student? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleCloseDeleteStudentModal}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              onClick={() => deleteMutation.mutate(deleteStudentId)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isVisible={editStudent} onClose={handleCloseEditStudentModal}>
        <EditStudentForm
          student={selectedStudent}
          onClose={handleCloseEditStudentModal}
        />
      </Modal>
      <Modal isVisible={addStudent} onClose={onCloseAddStudent}>
        <AddStudentForm onClose={onCloseAddStudent} />
      </Modal>
    </div>
  )
}

export default StudentController
