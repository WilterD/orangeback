import dotenv from 'dotenv'

dotenv.config()

export const AUTH_SECRET = process.env.AUTH_SECRET
export const AUTH_EXPIRE = process.env.AUTH_EXPIRE
export const AUTH_ROUNDS = process.env.AUTH_ROUNDS
export const PORT = process.env.PORT
export const DBPORT = process.env.DBPORT
export const DBNAME = process.env.DBNAME
export const DBUSER = process.env.DBUSER
export const DBHOST = process.env.DBHOST
export const DBPASSWORD = process.env.DBPASSWORD
