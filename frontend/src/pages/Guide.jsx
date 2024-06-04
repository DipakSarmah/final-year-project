/* eslint-disable react/prop-types */
import { Fragment, useState } from 'react'
import Modal from '../components/Modal'
import AddProjectDetails from '../forms/AddProjectDetails'
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

function Guide() {
  // const [addProject, setAddProject] = useState(false)
  const navigate = useNavigate()

  // const onCloseProject = () => {
  //   setAddProject(false)
  // }
  return (
    <Fragment>
      <div>
        {/* <h1 className="text-2xl font-sans font-bold text-center">
          welcome guide
        </h1> */}
        <div>
          {/* <p>
            With just a single click, professors can now seamlessly add new
            research projects to the system, streamlining the process of project
            management and ensuring that all project details are efficiently
            recorded and accessible.
          </p>
          <button
            className="bg-black rounded-lg text-white font-mono text-md font-medium px-5 py-2.5 m-2"
            onClick={() => setAddProject(true)}
          >
            Add Project Details
          </button>
          <Modal isVisible={addProject} onClose={onCloseProject}>
            <AddProjectDetails onClose={onCloseProject} />
          </Modal> */}

          <section>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
              <h1 className="text-4xl font-bold mb-8">Guide Dashboard</h1>
              <p className="text-xl font-bold mb-8">
                With just a single click, professors can now seamlessly add new
                research projects to the system, streamlining the process of
                project management and ensuring that all project details are
                efficiently recorded and accessible.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card
                  title="Student Maintenance"
                  description="Manage students: create, update, delete, and view list of students."
                  onClick={() => navigate('/guide/student')}
                />
                <Card
                  title="Team Maintenance"
                  description="Manage Team: create, update, delete, and view list of Teams."
                  onClick={() => navigate('/guide/team')}
                />

                <Card
                  title="Project Details Maintenance"
                  description="Manage project details: create, update, delete, and view project details."
                  onClick={() => navigate('/guide/project-details')}
                />
                <Card
                  title="Manual Project Allotment"
                  description="Manage Manual Project Allotment: Allocate Your project to a student."
                  onClick={() => navigate('/guide/project-allotment')}
                ></Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  )
}

export default Guide
