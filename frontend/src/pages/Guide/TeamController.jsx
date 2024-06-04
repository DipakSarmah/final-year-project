import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/SideBar'

function TeamController() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-4/5 lg:ml-[120px] sm:ml-[-50px] ml-[-20%] lg:ml-[-5%] bg-gray-200">
        <Outlet />
      </div>
    </div>
  )
}

export default TeamController

