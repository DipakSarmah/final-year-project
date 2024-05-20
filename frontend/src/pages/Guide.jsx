import { Fragment, useState } from 'react'
import Modal from '../components/Modal'
import AddProjectDetails from '../forms/AddProjectDetails'

function Guide() {
  const [addProject, setAddProject] = useState(false)

  const onCloseProject = () => {
    setAddProject(false)
  }
  return (
    <Fragment>
      <div>
        <h1 className="text-2xl font-sans font-bold text-center">
          welcome guide
        </h1>

        <button
          className="bg-black rounded-lg text-white font-mono text-md font-medium px-5 py-2.5 m-2"
          onClick={() => setAddProject(true)}
        >
          Add Project Details
        </button>

        <Modal isVisible={addProject} onClose={onCloseProject}>
          <AddProjectDetails onClose={onCloseProject} />
        </Modal>
      </div>
    </Fragment>
  )
}

export default Guide
