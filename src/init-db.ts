import { pool } from './database'
import fs from 'fs'
import path from 'path'

async function executeSqlFile (filename: string): Promise<void> {
  const filePath = path.resolve(__dirname, '..', 'sql', filename)
  const sql = fs.readFileSync(filePath).toString()
  await pool.query(sql)
}

async function initDb (): Promise<void> {
  try {
    // await executeSqlFile('deleter.sql')
    await executeSqlFile('database.sql')
    await executeSqlFile('database_seeds.sql')
    console.log('Database initialization complete!')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
initDb()
