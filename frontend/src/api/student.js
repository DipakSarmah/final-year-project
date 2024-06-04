const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchStudents = async (
  search,
  sortBy,
  sortOrder,
  department = null,
  role = 'Admin'
) => {
  console.log('fetching students', department)
  const queryParams = new URLSearchParams({
    search,
    sort_by: sortBy,
    sort_order: sortOrder,
  })
  if (role === 'Guide' && department) {
    queryParams.append('department', department)
  }
  console.log(queryParams.toString())

  const response = await fetch(
    `${API_BASE_URL}/api/student?${queryParams.toString()}`
  )
  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to fetch students')
  }

  const data = await response.json()
  return data.data
}

export const deleteStudent = async (id) => {
  console.log(id)
  const token = localStorage.getItem('userInfo')
  const response = await fetch(`${API_BASE_URL}/api/student/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to delete student')
  }
  return await response.json()
}

export const addStudent = async (data) => {
  let token = localStorage.getItem('userInfo')

  const response = await fetch(`${API_BASE_URL}/api/student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody
}

export const updateStudent = async (id, data) => {
  const token = localStorage.getItem('userInfo')
  // console.log(token)
  if (!token) return
  const response = await fetch(`${API_BASE_URL}/api/student/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update student')
  }
  return await response.json()
}

export const getBatchMates = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/student/batchmates?userId=${userId}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody.data
}

export const getAllTeamRequest = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/student/teamRequest?userId=${userId}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody.data
}

export const handleApiAcceptTeamRequest = async (data) => {
  // console.log(data)
  const response = await fetch(`${API_BASE_URL}/api/student/team`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody.data
}

export const handleApiRejectTeamRequest = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/student/batchmates`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody.data
}

// const createAddTeam = async (senderId,receiverId)=>{
//   const response = await fetch()
// }

export const addNewTeamApi = async (data) => {
  // console.log('add new team api student', data)
  const response = await fetch(`${API_BASE_URL}/api/student/team`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody.data
}
export const handleAddNotification = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/student/batchmates`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody.data
}

export const handleFetchAllTeammates = async (userId) => {
  // console.log('fetching teammates', userId)
  const response = await fetch(
    `${API_BASE_URL}/api/student/team?userId=${userId}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  // console.log(responseBody.data)
  return responseBody.data
}

export const storePreferences = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/student/preference`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody.data
}

export const fetchProjectAllocation = async (teamId) => {
  // console.log('testing fetch project allocations', teamId)
  const response = await fetch(
    `${API_BASE_URL}/api/project/project-allocation/${teamId}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const responseBody = await response.json()
  // console.log('from project allocation', responseBody)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody
}

export const fetchAppointmentsByStudent = async (teamId) => {
  // console.log('fetch appoinmtnefna: ', teamId)

  const response = await fetch(
    `${API_BASE_URL}/api/student/appointment/${teamId}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  if (!response.ok) {
    throw new Error('Failed to fetch appointments')
  }
  const data = await response.json()
  // console.log(data)
  return data.data
}

export const fetchResourcesByTeamAndGuide = async (teamId, guideId) => {
  // console.log(teamId, guideId)
  const response = await fetch(
    `${API_BASE_URL}/api/project-guide/resources/${teamId}/${guideId}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to fetch resources')
  }

  return await response.json()
}
