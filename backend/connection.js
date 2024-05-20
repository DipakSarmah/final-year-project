import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
}
const db = mysql.createPool(dbConfig)
if (db) console.log('connected')
export default db

// import mysql from 'mysql2/promise';

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
// }

// const db = async () => {
//   try {
//     const pool = mysql.createPool(dbConfig);
//     if (pool) console.log('Connected to database');
//     return pool;
//   } catch (error) {
//     console.error('Error connecting to database:', error);
//     throw error; // Rethrow the error to handle it elsewhere
//   }
// }

// export default db;
