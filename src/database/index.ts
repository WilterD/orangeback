import { Pool } from 'pg'
import { DBUSER, DBHOST, DBNAME, DBPASSWORD, DBPORT } from '../config'

export const pool = new Pool({
  port: Number(DBPORT),
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASSWORD
})
