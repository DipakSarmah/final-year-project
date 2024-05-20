const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

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
  console.log('fetching teammates', userId)
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
  console.log(responseBody.data)
  return responseBody.data
}
