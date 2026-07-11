/**
 * Applies the current Payload schema to the database (equivalent to accepting
 * the dev push prompt). Run only after backing up: node scripts/backup-db.mjs
 * Usage: npm run payload run scripts/push-schema.ts
 */
import { getPayload } from 'payload'

// Prevent the automatic interactive dev push during init
Object.assign(process.env, { NODE_ENV: 'production' })

const { default: config } = await import('../src/payload.config')

const payload = await getPayload({ config })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = payload.db as any

const { pushSchema } = adapter.requireDrizzleKit()
const { apply, hasDataLoss, warnings } = await pushSchema(
  adapter.schema,
  adapter.drizzle,
  adapter.schemaName ? [adapter.schemaName] : undefined,
  adapter.tablesFilter,
  adapter.extensions?.postgis ? ['postgis'] : undefined,
)

console.log('hasDataLoss:', hasDataLoss)
console.log('warnings:\n' + (warnings.length ? warnings.join('\n') : '(none)'))
await apply()
console.log('Schema pushed.')
process.exit(0)
