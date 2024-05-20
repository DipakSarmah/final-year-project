import { Fragment, useState } from 'react'
import Modal from '../components/Modal'
import AddProjectGuide from '../forms/AddProjectGuide'

function Admin() {
  const [addGuide, setAddGuide] = useState(false)

  const onClose = () => {
    setAddGuide(false)
  }
  return (
    <Fragment>
      <div>
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
      </div>
    </Fragment>
  )
}

export default Admin
