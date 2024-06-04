const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchTeams = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/teams`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to fetch teams')
  }

  const data = await response.json()
  //   console.log(data)
  return data.data
}

export const fetchTeamMembers = async (teamId) => {
  //   console.log(teamId)
  const response = await fetch(
    `${API_BASE_URL}/api/admin/teams/${teamId}/members`,
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
    throw new Error(errorDetails.message || 'Failed to fetch team members')
  }

  const data = await response.json()
  return data.data
}

export const deleteTeam = async (teamId) => {
  const token = localStorage.getItem('userInfo')
  const response = await fetch(`${API_BASE_URL}/api/admin/teams/${teamId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to delete the guide')
  }

  const message = await response.json()
  // console.log('testing in delte', message)
  return message
}

export const removeMember = async (enrollmentId) => {
  const response = await fetch(`${API_BASE_URL}/api/members/${enrollmentId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to remove member')
  }

  return response.json()
}

export const updateMember = async (enrollmentId, data) => {
  const response = await fetch(`${API_BASE_URL}/api/members/${enrollmentId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to update member')
  }

  return response.json()
}

export const automaticAllotment = async (dept_id) => {
  const response = await fetch(
    `${API_BASE_URL}/api/project/automatic-allotment`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dept_id }),
    }
  )

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(
      errorDetails.message || 'Failed to perform automatic allotment'
    )
  }

  return response.json()
}
export const confirmAllotment = async (allotmentData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/project/confirm-allotment`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ allotmentData }),
    }
  )

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to confirm allotment')
  }

  return await response.json().data
}

export const fetchDepartments = async () => {
  const response = await fetch(`${API_BASE_URL}/api/project/departments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to fetch departments')
  }

  return response.json()
}
