import { useState } from 'react'
import { ToastMessageType, studentTableHeaders } from '../variables'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAppContext } from '../hooks/useContextHooks'
import {
  handleAddNotification,
  addNewTeamApi,
  getAllTeamRequest,
  getBatchMates,
  handleApiAcceptTeamRequest,
  handleApiRejectTeamRequest,
} from '../api/student'

import Modal from '../components/Modal'

function Teams() {
  const [search, setSearch] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [openCreateTeamModal, setOpenCreateModal] = useState(false)
  const { user, showToast } = useAppContext()
  const enrolliD = user.enrollment_id
  const sem = user.sem
  const cgpa = user.cgpa

  const mutationTeam = useMutation({
    mutationFn: addNewTeamApi,
    onSuccess: async () => {
      // create a success toast
      showToast({
        message: 'Successfully created a team',
        type: ToastMessageType.success,
      })
      // console.log('create a success toast. successfully added a new team.')
    },
    onError: (err) => {
      // console.log(err)
      showToast({ message: err.message, type: ToastMessageType.error })
    },
  })

  const mutateAcceptTeamNotification = useMutation({
    mutationFn: handleApiAcceptTeamRequest,
    onSuccess: async () => {
      showToast({
        message: 'Successfully join the Team.',
        type: ToastMessageType.success,
      })
      getAllTeamRequestQuery.refetch()
    },
    onError: (err) => {
      showToast({
        message: err.message,
        type: ToastMessageType.error,
      })
    },
  })

  const mutateRejectTeamNotification = useMutation({
    mutationFn: handleApiRejectTeamRequest,
    onSuccess: async () => {
      showToast({
        message: 'Successfully Remove Team Request Notification.',
        type: ToastMessageType.success,
      })
      getAllTeamRequestQuery.refetch()
    },
    onError: (err) => {
      showToast({
        message: err.message,
        type: ToastMessageType.error,
      })
    },
  })
  const mutationTeamNotification = useMutation({
    mutationFn: handleAddNotification,
    onSuccess: async () => {
      // create a success toast
      showToast({
        message: 'Successfully Sent Team Request',
        type: ToastMessageType.success,
      })
    },
    onError: (err) => {
      // create a error toast.
      console.log(err)
      showToast({
        message: err.message,
        type: ToastMessageType.error,
      })
    },
  })

  const queryBatchMates = useQuery({
    queryKey: ['batchMates'],
    queryFn: () => getBatchMates(enrolliD), //need to be change to userId. for general purpose.
  })

  const getAllTeamRequestQuery = useQuery({
    queryKey: ['teamRequest'],
    queryFn: () => getAllTeamRequest(enrolliD), //need to be change to userId. for general purpose.
  })

  let students = queryBatchMates
  // console.log(queryBatchMates)

  const handleAddTeamWithId = (enrolliD, sem, cgpa) => {
    setOpenCreateModal(false)
    mutationTeam.mutate({ enrolliD, sem, cgpa })
  }
  const handleAddTeammateNotification = (senderId, receiverId) => {
    // console.log(senderId, receiverId)

    mutationTeamNotification.mutate({ senderId, receiverId })
  }

  const handleTeamRequest = () => {
    showNotification ? true : getAllTeamRequestQuery.refetch()
    setShowNotification((showNotification) => !showNotification)
  }
  function closeCreateTeamModal() {
    setOpenCreateModal(false)
  }

  const handleAcceptTeamRequest = (data, cgpa) => {
    // console.log(data,cgpa)
    mutateAcceptTeamNotification.mutate({ ...data, cgpa })
  }
  const handleRejectTeamRequest = (data, cgpa) => {
    mutateRejectTeamNotification.mutate({ ...data, cgpa })
  }

  // return (
  //   <div className="flex justify-center items-center flex-col min-h-screen bg-slate-400">
  //     <h1 className="text-white font-sans font-bold text-2xl m-5">
  //       welcome back {enrolliD}
  //     </h1>
  //     <div>
  //       <p className="text-start">Do you want to create your own team?</p>
  //       <button
  //         className="m-4 p-2 bg-black text-white "
  //         onClick={() => setOpenCreateModal(true)}
  //       >
  //         Create Your Own Team
  //       </button>
  //     </div>
  //     <Modal isVisible={openCreateTeamModal} onClose={closeCreateTeamModal}>
  //       <div className="max-w-xl mx-auto p-6 m-6 bg-white rounded-lg shadow-md border border-gray-200">
  //         <h1 className="text-3xl font-serif mb-6 text-gray-800">
  //           Team Creation Guidelines
  //         </h1>
  //         <p className="text-lg leading-relaxed text-gray-700 mb-8">
  //           If you create your own team, you cannot join or accept other team
  //           requests.
  //           <br />
  //           If you create a team by mistake, contact your project guide/admin to
  //           remove your team. After removing your team, you can join or accept
  //           other classmate team requests.
  //         </p>

  //         <div className="text-center">
  //           <button
  //             className="rounded-full bg-red-500 py-3 px-8 text-white font-semibold shadow-md hover:bg-red-600 transition duration-300"
  //             onClick={() => handleAddTeamWithId(enrolliD, sem, cgpa)} //added real user here.
  //           >
  //             Create Team
  //           </button>
  //         </div>
  //       </div>
  //     </Modal>

  //     {students.isLoading ? (
  //       <div className="text-center font-bold text-xl ">Loading...</div>
  //     ) : students.isError ? (
  //       <div className="text-center text-red-600">
  //         Error: {students.error.message}
  //       </div>
  //     ) : (
  //       <div className="w-full max-w-screen-lg mx-auto px-4">
  //         <h1 className="text-3xl font-bold text-center mb-4">
  //           Your Classmates
  //         </h1>
  //         <input
  //           type="text"
  //           placeholder="Search Names"
  //           className="w-full my-3 p-2 border-2 border-gray-400 rounded-md"
  //           value={search}
  //           onChange={(e) => setSearch(e.target.value)}
  //         />
  //         {students.isSuccess && (
  //           <div className="overflow-x-auto">
  //             <table className="w-full shadow-lg bg-white border border-gray-300 rounded-md">
  //               <thead className="bg-cyan-600 text-white">
  //                 <tr>
  //                   {studentTableHeaders.map((item) => (
  //                     <th key={item} className="py-3 px-6">
  //                       {item}
  //                     </th>
  //                   ))}
  //                 </tr>
  //               </thead>
  //               <tbody className="text-cyan-900 text-center">
  //                 {students.data
  //                   .filter((student) =>
  //                     search.trim() === ''
  //                       ? true
  //                       : student.first_name
  //                           .toLowerCase()
  //                           .includes(search.toLowerCase())
  //                   )
  //                   .map((student) => (
  //                     <tr
  //                       key={student.enrollment_id}
  //                       className="transition duration-300 hover:bg-cyan-100"
  //                     >
  //                       <td className="py-3 px-6">{student.enrollment_id}</td>
  //                       <td className="py-3 px-6">{student.first_name}</td>
  //                       <td className="py-3 px-6">{student.last_name}</td>
  //                       <td className="py-3 px-6">{student.gsuite_email}</td>
  //                       <td className="py-3 px-6">{student.cgpa}</td>
  //                       <td className="py-3 px-6">{student.sem}</td>
  //                       <td className="py-3 px-6">
  //                         <button
  //                           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
  //                           onClick={() =>
  //                             handleAddTeammateNotification(
  //                               enrolliD,
  //                               student.enrollment_id
  //                             )
  //                           }
  //                         >
  //                           Send Team Request
  //                         </button>
  //                       </td>
  //                     </tr>
  //                   ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         )}
  //       </div>
  //     )}

  //     <div className="w-full max-w-screen-lg mx-auto px-4 bg-gray-300 mt-10 mb-10 rounded-lg shadow-lg">
  //       <h1 className="text-3xl font-bold text-center text-gray-800 py-6 font-mono">
  //         All Requests to Join a Team
  //       </h1>

  //       <button
  //         className="bg-black rounded-md text-white py-2 px-4 font-bold mb-6 hover:bg-gray-800 transition duration-300"
  //         onClick={() => handleTeamRequest()}
  //       >
  //         Team Request Notification
  //       </button>

  //       <div className="flex flex-col items-center space-y-4 mb-10">
  //         {showNotification &&
  //           getAllTeamRequestQuery.isSuccess &&
  //           getAllTeamRequestQuery.data.length !== 0 &&
  //           getAllTeamRequestQuery.data.map((notification) => (
  //             <div
  //               className="bg-gray-200 mt-2 mb-2 flex justify-between w-full p-4 rounded-md"
  //               key={notification.request_id}
  //             >
  //               <p className="text-gray-800">
  //                 You have a request to join team {notification.sender_id}.
  //               </p>
  //               <div>
  //                 <button
  //                   onClick={() => handleAcceptTeamRequest(notification, cgpa)}
  //                   className="bg-green-500 mx-2 text-white py-2 px-4 font-bold rounded-sm hover:bg-green-600 transition duration-300"
  //                 >
  //                   Accept
  //                 </button>
  //                 <button
  //                   onClick={() => handleRejectTeamRequest(notification, cgpa)}
  //                   className="bg-red-500 mx-2 text-white py-2 px-4 font-bold rounded-sm hover:bg-red-600 transition duration-300"
  //                 >
  //                   Reject
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //         {showNotification &&
  //           getAllTeamRequestQuery.isSuccess &&
  //           getAllTeamRequestQuery.data.length === 0 && (
  //             <div className="text-gray-800 font-bold text-center p-4">
  //               No notifications at the moment.
  //             </div>
  //           )}
  //       </div>
  //     </div>
  //   </div>
  // )
  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold m-5 text-center">
        Welcome back, {enrolliD}
      </h1>
      <div className="bg-gray-800 p-4 rounded-lg mb-6 shadow-lg">
        <p className="text-lg font-sans mb-4">
          Do you want to create your own team?
        </p>
        <button
          className="bg-blue-500 text-white rounded-lg py-2 px-4 font-semibold hover:bg-blue-600 transition duration-300"
          onClick={() => setOpenCreateModal(true)}
        >
          Create Your Own Team
        </button>
      </div>
      <Modal isVisible={openCreateTeamModal} onClose={closeCreateTeamModal}>
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-3xl font-serif mb-6 text-gray-800">
            Team Creation Guidelines
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            If you create your own team, you cannot join or accept other team
            requests.
            <br />
            If you create a team by mistake, contact your project guide/admin to
            remove your team. After removing your team, you can join or accept
            other classmate team requests.
          </p>
          <div className="text-center">
            <button
              className="rounded-full bg-red-500 py-3 px-8 text-white font-semibold shadow-md hover:bg-red-600 transition duration-300"
              onClick={() => handleAddTeamWithId(enrolliD, sem, cgpa)}
            >
              Create Team
            </button>
          </div>
        </div>
      </Modal>

      {students.isLoading ? (
        <div className="text-center font-bold text-xl">Loading...</div>
      ) : students.isError ? (
        <div className="text-center text-red-600">
          Error: {students.error.message}
        </div>
      ) : (
        <div className="w-full max-w-screen-lg mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            Your Classmates
          </h1>
          <input
            type="text"
            placeholder="Search Names"
            className="w-full p-3 mb-4 border-2 border-gray-400 text-black rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {students.isSuccess && (
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-lg border border-gray-300 rounded-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    {studentTableHeaders.map((item) => (
                      <th key={item} className="py-3 px-6">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-800 text-center">
                  {students.data
                    .filter((student) =>
                      search.trim() === ''
                        ? true
                        : student.first_name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((student) => (
                      <tr
                        key={student.enrollment_id}
                        className="hover:bg-gray-100 transition duration-300"
                      >
                        <td className="py-3 px-6">{student.enrollment_id}</td>
                        <td className="py-3 px-6">{student.first_name}</td>
                        <td className="py-3 px-6">{student.last_name}</td>
                        <td className="py-3 px-6">{student.gsuite_email}</td>
                        <td className="py-3 px-6">{student.cgpa}</td>
                        <td className="py-3 px-6">{student.sem}</td>
                        <td className="py-3 px-6">
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                            onClick={() =>
                              handleAddTeammateNotification(
                                enrolliD,
                                student.enrollment_id
                              )
                            }
                          >
                            Send Team Request
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-screen-lg mx-auto px-4 bg-gray-800 mt-10 mb-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-100 py-6 font-mono">
          All Requests to Join a Team
        </h1>
        <button
          className="bg-blue-500 text-white rounded-md py-2 px-4 font-bold mb-6 hover:bg-blue-600 transition duration-300"
          onClick={() => handleTeamRequest()}
        >
          Team Request Notification
        </button>
        <div className="flex flex-col items-center space-y-4 mb-10">
          {showNotification &&
            getAllTeamRequestQuery.isSuccess &&
            getAllTeamRequestQuery.data.length !== 0 &&
            getAllTeamRequestQuery.data.map((notification) => (
              <div
                className="bg-gray-200 w-full p-4 rounded-md shadow-md flex justify-between"
                key={notification.request_id}
              >
                <p className="text-gray-800 text-pretty text-center py-2">
                  You have a request to join team {notification.sender_id}.
                </p>
                <div>
                  <button
                    onClick={() => handleAcceptTeamRequest(notification, cgpa)}
                    className="bg-green-500 mx-2 text-white py-2 px-4 font-bold rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectTeamRequest(notification, cgpa)}
                    className="bg-red-500 mx-2 text-white py-2 px-4 font-bold rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          {showNotification &&
            getAllTeamRequestQuery.isSuccess &&
            getAllTeamRequestQuery.data.length === 0 && (
              <div className=" font-bold text-center text-white p-4">
                No notifications at the moment.
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Teams
