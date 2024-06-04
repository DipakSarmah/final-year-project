const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const addProjectGuide = async (formData) => {
  const token = localStorage.getItem('userInfo')
  const response = await fetch(`${API_BASE_URL}/api/project-guide`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  })
  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody
}

export const fetchProjectGuides = async (search, sortBy, sortOrder) => {
  const token = localStorage.getItem('userInfo')

  const response = await fetch(
    `${API_BASE_URL}/api/project-guide?search=${encodeURIComponent(
      search
    )}&sort_by=${encodeURIComponent(sortBy)}&sort_order=${encodeURIComponent(
      sortOrder
    )}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  // console.log(data.data)
  return data.data
}

export const fetchGuideDetailsWithId = async (guideId) => {
  const token = localStorage.getItem('userInfo')

  const response = await fetch(`${API_BASE_URL}/api/project-guide/${guideId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  // console.log(data.data)
  return data.data
}

export const fetchTeamsByGuide = async (guide_id) => {
  const token = localStorage.getItem('userInfo')
  if (!token) {
    console.log('please sign in again')
  }

  const response = await fetch(
    `${API_BASE_URL}/api/project-guide/${guide_id}/teams`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch teams')
  }

  const data = await response.json()
  return data.data
}

export const editProjectGuide = async (guideId, guideData) => {
  // console.log('test guide api: ',guideData)
  const token = localStorage.getItem('userInfo')

  const response = await fetch(`${API_BASE_URL}/api/project-guide/${guideId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(guideData),
  })

  if (!response.ok) {
    throw new Error('Failed to edit the guide')
  }

  return await response.json()
}

export const deleteProjectGuide = async (guideId) => {
  const token = localStorage.getItem('userInfo')

  const response = await fetch(`${API_BASE_URL}/api/project-guide/${guideId}`, {
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

  return await response.json()
}

export const sendEmails = async (appointmentData) => {
  try {
    console.log('testing send emails :', appointmentData)
    const response = await fetch(
      `${API_BASE_URL}/api/project-guide/appointment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to send emails')
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending emails:', error)
    throw error
  }
}

export const fetchAppointmentsByGuide = async (guideId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/project-guide/appointment/${guideId}`,
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
    console.log('test fetch appointmentbyguide: ', data)
    return data.data
  } catch (error) {
    console.error('Error fetching appointments:', error)
    throw error
  }
}
