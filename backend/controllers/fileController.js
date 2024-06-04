import cloudinary from './../utils/cloudinaryConfig.js'
import db from '../connection.js'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const deleteFile = async (req, res) => {
  const { fileId, publicId } = req.body

  try {
    await cloudinary.uploader.destroy(publicId) // Delete the file from Cloudinary
    await db.query('DELETE FROM team_file WHERE team_file_id = ?', [fileId]) // Delete the file record from the database

    res.status(200).json({ message: 'File deleted successfully' })
  } catch (error) {
    console.error('Error deleting file:', error)
    res.status(500).json({ error: 'Error deleting file' })
  }
}

export const uploadFile = async (req, res) => {
  const { teamId, guideId, description } = req.body
  const file = req.file

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto',
      folder: 'Project-Management-System', // Optional: Organize files in a folder
      use_filename: true,
      unique_filename: false,
    })

    const fileUrl = result.secure_url
    const publicId = result.public_id
    const fileName = file.originalname
    const teamFileId = uuidv4()
    await db.query(
      'INSERT INTO team_file (team_file_id,team_id, guide_id, file_url, file_name, description,public_id) VALUES (?,?, ?, ?, ?, ?,?)',
      [teamFileId, teamId, guideId, fileUrl, fileName, description, publicId]
    )

    fs.unlinkSync(file.path) // Remove file from temp storage

    res
      .status(200)
      .json({ message: 'File uploaded successfully', data: fileUrl })
  } catch (error) {
    console.error('Error uploading file:', error)
    res.status(500).json({ error: 'Error uploading file' })
  }
}

export const getFiles = async (req, res) => {
  const { guideId } = req.params

  try {
    const [rows] = await db.query(
      'SELECT * FROM team_file WHERE guide_id = ?',
      [guideId]
    )
    res
      .status(200)
      .json({ message: 'successfully fetch all file of yours', data: rows })
  } catch (error) {
    console.error('Error fetching files:', error)
    res.status(500).json({ error: 'Error fetching files' })
  }
}
