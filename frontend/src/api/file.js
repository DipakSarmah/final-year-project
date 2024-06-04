const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const uploadFile = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/files/upload`, {
      method: 'POST',
      headers: {
        // Do not set the Content-Type header, let the browser set it automatically
        // when sending a multipart/form-data request
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload file')
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}
export const deleteFile = async (fileId, publicId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/files/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileId, publicId }),
    })

    if (!response.ok) {
      throw new Error('Failed to delete file')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

export const fetchFiles = async (guideId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/files/guide/${guideId}`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch files')
    }

    const data = await response.json()
    // console.log(data.data)
    return data.data
  } catch (error) {
    console.error('Error fetching files:', error)
    throw error
  }
}
