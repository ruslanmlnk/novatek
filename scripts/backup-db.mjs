/**
 * Full raw backup of every table in the Payload Postgres database to JSON.
 * Read-only: performs SELECT queries only, never modifies the schema or data.
 * Usage: node scripts/backup-db.mjs
 */
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import pg from 'pg'

config()

const { Client } = pg

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const client = new Client({ connectionString: url })
await client.connect()

const { rows: tables } = await client.query(
  `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name`,
)

const backup = {}
for (const { table_name: table } of tables) {
  const { rows } = await client.query(`SELECT * FROM "${table}"`)
  backup[table] = rows
  console.log(`${table}: ${rows.length} rows`)
}

const dir = path.resolve('backups')
fs.mkdirSync(dir, { recursive: true })
const file = path.join(dir, `db-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`)
fs.writeFileSync(file, JSON.stringify(backup, null, 2))
console.log(`\nSaved ${tables.length} tables to ${file}`)

await client.end()
