import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col w-64 h-screen">
      <button
        className="w-20 sm:w-24 lg:hidden md:hidden bg-gray-800 text-white py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      <div
        className={`sticky bg-gray-500 inset-y-0 left-0 w-44    lg:mt-[8%] md:mt-[11%] text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-50`}
      >
        <div className="p-4 ">
          <h2 className="text-2xl font-bold mb-4 text-pretty">
            Team Management
          </h2>
          <ul className="space-y-5">
            <li className="">
              <NavLink
                to="/guide/team"
                className={({ isActive }) =>
                  isActive
                    ? 'w-full px-5 py-2 rounded-md font-bold text-white bg-black '
                    : 'w-full px-5 py-2 rounded-md  text-white bg-black'
                }
              >
                Home
              </NavLink>
            </li>
            {/* <li className="">
              <NavLink
                to="/guide/team/logs"
                className={({ isActive }) =>
                  isActive
                    ? 'w-full px-5 py-2 rounded-md font-bold text-white bg-black '
                    : 'w-full px-5 py-2 rounded-md  text-white bg-black'
                }
              >
                Team Logs
              </NavLink>
            </li> */}
            <li className="">
              <NavLink
                to="/guide/team/appointments"
                className={({ isActive }) =>
                  isActive
                    ? 'w-full px-5 py-2 rounded-md font-bold text-white bg-black'
                    : 'bg-black px-4 py-2 rounded '
                }
              >
                Appointment
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/guide/team/resource-center"
                className={({ isActive }) =>
                  isActive
                    ? 'w-full px-2 py-2 rounded-md font-bold text-white bg-black'
                    : 'bg-black px-2 py-2 rounded '
                }
              >
                Resource Center
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isOpen ? 'block' : 'hidden'
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  )
}

export default Sidebar

// import { NavLink } from 'react-router-dom'

// function Sidebar({ isOpen, toggleSidebar }) {
//   return (
//     <div
//       className={`fixed inset-y-0 left-0 w-44 lg:mt-24 md:mt-24 sm:mt-24 mt-24 lg:mb-20 md:mb-20 bg-gray-800 text-white z-40 transform transition-transform duration-300 ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       } md:translate-x-0 md:fixed md:inset-y-0`}
//     >
//       <div className="p-4">
//         <h2 className="text-2xl font-bold mb-4">Team Management</h2>
//         <ul className="space-y-2">
//           <li>
//             <NavLink
//               to="/guide/team"
//               className={({ isActive }) =>
//                 isActive
//                   ? 'bg-gray-700 p-2 rounded-md block'
//                   : 'p-2 rounded-md block'
//               }
//               onClick={toggleSidebar}
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/guide/team/logs"
//               className={({ isActive }) =>
//                 isActive
//                   ? 'bg-gray-700 p-2 rounded-md block'
//                   : 'p-2 rounded-md block'
//               }
//               onClick={toggleSidebar}
//             >
//               Team Logs
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/guide/team/appointments"
//               className={({ isActive }) =>
//                 isActive
//                   ? 'bg-gray-700 p-2 rounded-md block'
//                   : 'p-2 rounded-md block'
//               }
//               onClick={toggleSidebar}
//             >
//               Team Appointments
//             </NavLink>
//           </li>
//           <li>
//             <div
//               className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 ${
//                 isOpen ? 'block' : 'hidden'
//               }`}
//               onClick={toggleSidebar}
//             >
//               close
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Sidebar
