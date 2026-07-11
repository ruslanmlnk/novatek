/**
 * Restores pre-localization field values into the "en" locale tables.
 * Reads the JSON backup produced by scripts/backup-db.mjs and, for every
 * table that now has a corresponding <table>_locales table, inserts the old
 * column values with _locale = 'en'. Idempotent (ON CONFLICT DO NOTHING).
 * Usage: node scripts/restore-en-locale.mjs backups/<file>.json
 */
import { config } from 'dotenv'
import fs from 'fs'
import pg from 'pg'

config()

const backupFile = process.argv[2]
if (!backupFile) {
  console.error('Usage: node scripts/restore-en-locale.mjs <backup.json>')
  process.exit(1)
}
const backup = JSON.parse(fs.readFileSync(backupFile, 'utf-8'))

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

const { rows: localeTables } = await client.query(
  `SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public' AND table_name LIKE '%\\_locales' ESCAPE '\\'`,
)

let totalInserted = 0
for (const { table_name: localeTable } of localeTables) {
  const sourceTable = localeTable.replace(/_locales$/, '')
  const sourceRows = backup[sourceTable]
  if (!sourceRows?.length) continue

  const { rows: cols } = await client.query(
    `SELECT column_name, data_type FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = $1`,
    [localeTable],
  )
  const dataCols = cols
    .map((c) => c.column_name)
    .filter((c) => !['id', '_locale', '_parent_id'].includes(c))

  let inserted = 0
  for (const row of sourceRows) {
    const present = dataCols.filter((c) => c in row && row[c] !== null)
    if (!present.length) continue
    const values = present.map((c) => {
      const v = row[c]
      return typeof v === 'object' ? JSON.stringify(v) : v
    })
    const colSql = present.map((c) => `"${c}"`).join(', ')
    const placeholders = present.map((_, i) => `$${i + 3}`).join(', ')
    const res = await client.query(
      `INSERT INTO "${localeTable}" ("_locale", "_parent_id"${present.length ? ', ' + colSql : ''})
       VALUES ($1, $2${present.length ? ', ' + placeholders : ''})
       ON CONFLICT DO NOTHING`,
      ['en', row.id, ...values],
    )
    inserted += res.rowCount
  }
  totalInserted += inserted
  console.log(`${localeTable}: ${inserted} rows restored (from ${sourceTable})`)
}

console.log(`\nDone. ${totalInserted} locale rows inserted.`)
await client.end()
