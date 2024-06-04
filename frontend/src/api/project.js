const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

//api for guide to add new project
export const handleAddNewProject = async (formData) => {
  const accessToken = localStorage.getItem('userInfo')
  const response = await fetch(`${API_BASE_URL}/api/project/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(formData),
  })
  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody
}

export const fetchUnallottedProjects = async (userDetails) => {
  console.log(userDetails)
  const queryParams = new URLSearchParams({
    department: userDetails.department,
    course: userDetails.course,
  }).toString()
  const response = await fetch(
    `${API_BASE_URL}/api/project/unallotted-projects?${queryParams}`,
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

export const deleteProject = async (projectId) => {
  const token = localStorage.getItem('userInfo')

  const response = await fetch(`${API_BASE_URL}/api/project/${projectId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to delete project')
  }

  return await response.json()
}

export const updateProject = async (projectId, projectDetails) => {
  console.log(projectDetails)
  const token = localStorage.getItem('userInfo')

  const response = await fetch(`${API_BASE_URL}/api/project/${projectId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectDetails),
  })

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to update project')
  }

  return await response.json()
}

// export const fetchProjects = async (search, sortBy, sortOrder) => {
//   const token = localStorage.getItem('userInfo')

//   const response = await fetch(
//     `${API_BASE_URL}/api/project?search=${encodeURIComponent(
//       search
//     )}&sort_by=${encodeURIComponent(sortBy)}&sort_order=${encodeURIComponent(
//       sortOrder
//     )}`,
//     {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )
//   if (!response.ok) {
//     throw new Error('Failed to fetch students')
//   }
//   const data = await response.json()
//   console.log(data.data)
//   return data.data
// }

// api/project.js

export const fetchProjects = async (
  search,
  sortBy,
  sortOrder,
  guideId = null
) => {
  const token = localStorage.getItem('userInfo')

  const queryParams = new URLSearchParams({
    search: encodeURIComponent(search),
    sort_by: encodeURIComponent(sortBy),
    sort_order: encodeURIComponent(sortOrder),
  })

  if (guideId) {
    queryParams.append('guide_id', guideId)
  }
  console.log('query parameters: ', queryParams.toString())

  const response = await fetch(
    `${API_BASE_URL}/api/project?${queryParams.toString()}`,
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
    const errorDetails = await response.json()
    throw new Error(errorDetails.message || 'Failed to fetch projects')
  }

  const data = await response.json()
  return data.data
}

// api/project.js

export const fetchProjectDetails = async (projectId) => {
  try {
    const response = await fetch(`/api/project/${projectId}`)
    if (!response.ok) {
      const errorDetails = await response.json()
      throw new Error(errorDetails.message || 'Failed to fetch project details')
    }
    return await response.json()
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch project details')
  }
}
