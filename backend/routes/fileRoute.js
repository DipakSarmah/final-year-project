import express from 'express'
import multer from 'multer'

import { uploadFile, getFiles,deleteFile } from './../controllers/fileController.js'

const router = express.Router()
const upload = multer({ dest: 'uploads/' }) // Temp storage before uploading to Cloudinary

router.post('/upload', upload.single('file'), uploadFile)
router.post('/delete', deleteFile);
router.get('/guide/:guideId', getFiles)

export default router
