/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ title, description, onClick }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    onClick={onClick}
  >
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
)

function Admin() {
  const navigate = useNavigate()
  return (
    <Fragment>
      {/* <div>
        <h1>Admin page</h1>

        <button
          className="bg-black rounded-lg text-white font-mono text-md font-medium px-5 py-2.5 "
          onClick={() => setAddGuide(true)}
        >
          Add Project Guide
        </button>

        <Modal isVisible={addGuide} onClose={onClose}>
          <AddProjectGuide onClose={onClose} />
        </Modal>
      </div> */}
      <section>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card
              title="Student Maintenance"
              description="Manage students: create, update, delete, and view list of students."
              onClick={() => navigate('/admin/student')}
            />
            <Card
              title="Guide Maintenance"
              description="Manage Project guides: create, update, delete, and view list of guides."
              onClick={() => navigate('/admin/guides')}
            />

            <Card
              title="Project Details Maintenance"
              description="Manage project details: create, update, delete, and view project details."
              onClick={() => navigate('/admin/project-details')}
            />
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Admin
