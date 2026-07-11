import { getPayload } from 'payload'
import config from '@payload-config'

/** Payload local API client (cached by Payload itself). */
export const db = () => getPayload({ config })
