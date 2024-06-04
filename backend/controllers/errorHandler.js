import AppError from '../utils/AppError.js'

const handleDuplicateFieldsDB = (error) => {
  const message = `Duplicate field value: ${
    error.sqlMessage.match(/'[^']+'/)[0]
  }. Please use another value!`
  return new AppError(message, 400)
}
const handleWrongDataTypeFieldsDB = (error) => {
  const message = `Wrong data type for field: ${
    error.sqlMessage.match(/'[^']+'/)[0]
  }. Please provide correct data type!`
  return new AppError(message, 400)
}

const handleReferenceError = (error) => {
  const match = error.sqlMessage.match(/FOREIGN KEY \(`(.*?)`\)/)
  const field = match ? match[1] : 'Unknown field'
  const message = `Invalid reference: The value provided for the field '${field}' does not exist.`
  return new AppError(message, 400)
}
const handleCaseErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}.`
  return new AppError(message, 400)
}

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  console.log('test error send error from production', err)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err)

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

const sendErrorDev = (err, res) => {
  console.log('test send error from dev', err)
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}
const handleJWTError = (err) =>
  new AppError('Invalid Token. Please log in again', 401)

const handleJWTExpiredError = (err) =>
  new AppError('Your token has expired! Please log in again', 401)

export default (err, req, res, next) => {
  console.log(err)
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }

    if (error.name === 'CastError') {
      error = handleCaseErrorDB(error)
    }
    if (error.code === 'ER_DUP_ENTRY') {
      error = handleDuplicateFieldsDB(error)
    }
    if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
      error = handleWrongDataTypeFieldsDB(error)
    }

    if (error.name === 'JsonWebTokenError') error = handleJWTError(error)
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(error)
    if (error.errno === 1452) error = handleReferenceError(error)

    // error.message = err.message
    sendErrorProd(error, res)
  }
}
