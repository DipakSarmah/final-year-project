// import { useState } from 'react'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useAppContext } from '../../hooks/useContextHooks'
// import { deleteProject, fetchProjects } from '../../api/project'
// import Modal from '../../components/Modal'
// import AddProjectForm from '../../forms/project details/AddProjectForm'
// import EditProjectForm from '../../forms/project details/EditProjectForm'
// import { PROJECT_TABLE_HEADER, ToastMessageType } from '../../variables'

// function ProjectController() {
//   const [addProject, setAddProject] = useState(false)
//   const [editProject, setEditProject] = useState(false)
//   const [selectedProject, setSelectedProject] = useState(null)

//   const { showToast, user, role } = useAppContext()

//   const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState(false)
//   const [deleteProjectId, setDeleteProjectId] = useState('')
//   const [localSearch, setLocalSearch] = useState('')
//   const [localSortBy, setLocalSortBy] = useState('project_name')
//   const [localSortOrder, setLocalSortOrder] = useState('asc')
//   const [search, setSearch] = useState('')
//   const [sortBy, setSortBy] = useState('project_name')
//   const [sortOrder, setSortOrder] = useState('asc')

//   const queryClient = useQueryClient()

//   const deleteMutation = useMutation({
//     mutationFn: deleteProject,
//     onSuccess: () => {
//       setOpenDeleteProjectModal(false)
//       queryClient.invalidateQueries(['projects'])
//       showToast({
//         message: 'Successfully removed the project details',
//         type: ToastMessageType.success,
//       })
//     },
//     onError: (error) => {
//       setOpenDeleteProjectModal(false)
//       showToast({
//         message: error.message,
//         type: ToastMessageType.error,
//       })
//       console.error('Error deleting the project:', error)
//     },
//   })

//   const {
//     data: projects,
//     isLoading,
//     error,
//     refetch: refetchProjects,
//   } = useQuery({
//     queryKey: ['projects', search, sortBy, sortOrder],
//     queryFn: () => fetchProjects(search, sortBy, sortOrder),
//     keepPreviousData: true,
//   })

//   const handleApplyFilters = () => {
//     setSearch(localSearch)
//     setSortBy(localSortBy)
//     setSortOrder(localSortOrder)
//     refetchProjects()
//   }

//   const handleSearchChange = (e) => setLocalSearch(e.target.value)
//   const handleSortByChange = (e) => setLocalSortBy(e.target.value)
//   const handleSortOrderChange = (e) => setLocalSortOrder(e.target.value)

//   const onCloseAddProject = () => {
//     refetchProjects()
//     setAddProject(false)
//   }

//   const handleOpenEditModal = (project) => {
//     setSelectedProject(project)
//     setEditProject(true)
//   }

//   const handleCloseEditProjectModal = () => {
//     setEditProject(false)
//   }

//   const handleCloseDeleteProjectModal = () => {
//     setOpenDeleteProjectModal(false)
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
//       <h1 className="text-4xl font-bold mb-8">Project Management</h1>
//       <p className="text-lg mb-4">
//         As an admin, you can perform the following actions:
//       </p>
//       <ul className="list-disc list-inside text-left mb-10">
//         <li>Create a new project.</li>
//         <li>Update project details.</li>
//         <li>Remove a project from the database.</li>
//         <li>View a list of all projects.</li>
//       </ul>
//       <button
//         className="bg-black text-white font-mono text-md font-medium px-5 py-2.5 rounded-lg mb-6"
//         onClick={() => setAddProject(true)}
//       >
//         Add New Project
//       </button>

//       <div className="mb-4">
//         <input
//           type="text"
//           value={localSearch}
//           onChange={handleSearchChange}
//           placeholder="Search..."
//           className="mb-2 p-2 border rounded"
//         />
//         <label htmlFor="sortBy" className="ml-2">
//           Sort by:
//         </label>
//         <select
//           id="sortBy"
//           value={localSortBy}
//           onChange={handleSortByChange}
//           className="ml-2 p-2 border rounded"
//         >
//           <option value="project_name">Project Name</option>
//           <option value="project_id">Project ID</option>
//           <option value="project_start_date">Start Date</option>
//           <option value="project_end_date">End Date</option>
//         </select>
//         <label htmlFor="sortOrder" className="ml-2">
//           Sort order:
//         </label>
//         <select
//           id="sortOrder"
//           value={localSortOrder}
//           onChange={handleSortOrderChange}
//           className="ml-2 p-2 border rounded"
//         >
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       <button
//         className="bg-blue-500 rounded-lg text-white font-mono text-md font-medium px-5 py-2.5 hover:bg-blue-600"
//         onClick={handleApplyFilters}
//       >
//         Apply Filters
//       </button>

//       {isLoading && <p>Loading...</p>}
//       {error && <p>Error: {error.message}</p>}
//       {projects && (
//         <div className="overflow-x-auto w-full">
//           <table className="min-w-full bg-white rounded-lg shadow-md">
//             <thead>
//               <tr>
//                 {PROJECT_TABLE_HEADER.map((col) => (
//                   <th
//                     key={col}
//                     className="py-2 px-4 border-b text-left font-semibold text-gray-700"
//                   >
//                     {col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project) => (
//                 <tr key={project.project_id}>
//                   <td className="py-2 px-4 border-b">{project.project_name}</td>
//                   <td className="py-2 px-4 border-b">{project.project_id}</td>
//                   <td className="py-2 px-4 border-b">
//                     {project.project_description}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {project.project_tagname}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {project.project_start_date}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {project.project_end_date}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {project.department_name}
//                   </td>
//                   <td className="py-2 px-4 border-b">{project.course}</td>
//                   <td className="py-2 px-4 border-b">{project.semester}</td>
//                   <td className="py-2 px-4 border-b">{project.guide_id}</td>
//                   <td className="py-2 px-4 border-b">{project.team_id}</td>
//                   <td className="py-2 px-4 border-b">
//                     {project.allotted_type}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
//                       onClick={() => handleOpenEditModal(project)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                       onClick={() => {
//                         setDeleteProjectId(project.project_id)
//                         setOpenDeleteProjectModal(true)
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Modal
//         isVisible={openDeleteProjectModal}
//         onClose={handleCloseDeleteProjectModal}
//       >
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Delete Project</h2>
//           <p className="mb-6 text-red-600">
//             <strong>Warning:</strong> Are you sure you want to delete the
//             details of this project? This action cannot be undone.
//           </p>
//           <div className="flex justify-end space-x-4">
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//               onClick={handleCloseDeleteProjectModal}
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
//               onClick={() => deleteMutation.mutate(deleteProjectId)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </Modal>

//       <Modal isVisible={editProject} onClose={handleCloseEditProjectModal}>
//         <EditProjectForm
//           project={selectedProject}
//           onClose={handleCloseEditProjectModal}
//         />
//       </Modal>
//       <Modal isVisible={addProject} onClose={onCloseAddProject}>
//         <AddProjectForm onClose={onCloseAddProject} />
//       </Modal>
//     </div>
//   )
// }

// export default ProjectController

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '../../hooks/useContextHooks'
import { deleteProject, fetchProjects } from '../../api/project'
import Modal from '../../components/Modal'
import AddProjectForm from '../../forms/project details/AddProjectForm'
import EditProjectForm from '../../forms/project details/EditProjectForm'
import { PROJECT_TABLE_HEADER, ToastMessageType } from '../../variables'

function ProjectController() {
  const [addProject, setAddProject] = useState(false)
  const [editProject, setEditProject] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const { showToast, user, role } = useAppContext()

  const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState(false)
  const [deleteProjectId, setDeleteProjectId] = useState('')
  const [localSearch, setLocalSearch] = useState('')
  const [localSortBy, setLocalSortBy] = useState('project_name')
  const [localSortOrder, setLocalSortOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('project_name')
  const [sortOrder, setSortOrder] = useState('asc')

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      setOpenDeleteProjectModal(false)
      queryClient.invalidateQueries(['projects'])
      showToast({
        message: 'Successfully removed the project details',
        type: ToastMessageType.success,
      })
    },
    onError: (error) => {
      setOpenDeleteProjectModal(false)
      showToast({
        message: error.message,
        type: ToastMessageType.error,
      })
      console.error('Error deleting the project:', error)
    },
  })

  const fetchProjectData = () => {
    console.log('role is : ', role)
    console.log('user is : ', user)
    if (role === 'admin') {
      return fetchProjects(search, sortBy, sortOrder)
    } else if (role === 'Guide' && user && user.guide_id) {
      return fetchProjects(search, sortBy, sortOrder, user.guide_id)
    } else {
      return []
    }
  }

  const {
    data: projects,
    isLoading,
    error,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: [
      'projects',
      search,
      sortBy,
      sortOrder,
      role,
      user ? user.guide_id : null,
    ],
    queryFn: fetchProjectData,
    keepPreviousData: true,
  })

  const handleApplyFilters = () => {
    setSearch(localSearch)
    setSortBy(localSortBy)
    setSortOrder(localSortOrder)
    refetchProjects()
  }

  const handleSearchChange = (e) => setLocalSearch(e.target.value)
  const handleSortByChange = (e) => setLocalSortBy(e.target.value)
  const handleSortOrderChange = (e) => setLocalSortOrder(e.target.value)

  const onCloseAddProject = () => {
    refetchProjects()
    setAddProject(false)
  }

  const handleOpenEditModal = (project) => {
    setSelectedProject(project)
    setEditProject(true)
  }

  const handleCloseEditProjectModal = () => {
    setEditProject(false)
  }

  const handleCloseDeleteProjectModal = () => {
    setOpenDeleteProjectModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-8">Project Management</h1>
      <p className="text-lg mb-4">
        {role === 'admin'
          ? 'As an admin, you can perform the following actions:'
          : 'As a guide, you can manage projects assigned to you:'}
      </p>
      <ul className="list-disc list-inside text-left mb-10">
        <li>Create a new project.</li>
        <li>Update project details.</li>
        <li>Remove a project from the database.</li>
        <li>View a list of all projects.</li>
      </ul>
      <button
        className="bg-black text-white font-mono text-md font-medium px-5 py-2.5 rounded-lg mb-6"
        onClick={() => setAddProject(true)}
      >
        Add New Project
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
          <option value="project_name">Project Name</option>
          <option value="project_id">Project ID</option>
          <option value="project_start_date">Start Date</option>
          <option value="project_end_date">End Date</option>
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
      {projects && (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                {PROJECT_TABLE_HEADER.map((col) => (
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
              {projects.map((project) => (
                <tr key={project.project_id}>
                  <td className="py-2 px-4 border-b">{project.project_name}</td>
                  <td className="py-2 px-4 border-b">{project.project_id}</td>
                  <td className="py-2 px-4 border-b">
                    {project.project_description}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {project.project_tagname}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {project.project_start_date}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {project.project_end_date}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {project.department_name}
                  </td>
                  <td className="py-2 px-4 border-b">{project.course}</td>
                  <td className="py-2 px-4 border-b">{project.semester}</td>
                  <td className="py-2 px-4 border-b">{project.guide_id}</td>
                  <td className="py-2 px-4 border-b">{project.team_id}</td>
                  <td className="py-2 px-4 border-b">
                    {project.allotted_type}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleOpenEditModal(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setDeleteProjectId(project.project_id)
                        setOpenDeleteProjectModal(true)
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
        isVisible={openDeleteProjectModal}
        onClose={handleCloseDeleteProjectModal}
      >
        <div>
          <h2 className="text-xl font-semibold mb-4">Delete Project</h2>
          <p className="mb-6 text-red-600">
            <strong>Warning:</strong> Are you sure you want to delete the
            details of this project? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleCloseDeleteProjectModal}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              onClick={() => deleteMutation.mutate(deleteProjectId)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isVisible={editProject} onClose={handleCloseEditProjectModal}>
        <EditProjectForm
          project={selectedProject}
          onClose={handleCloseEditProjectModal}
        />
      </Modal>
      <Modal isVisible={addProject} onClose={onCloseAddProject}>
        <AddProjectForm onClose={onCloseAddProject} />
      </Modal>
    </div>
  )
}

export default ProjectController
