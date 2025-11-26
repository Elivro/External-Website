import { getPayload } from 'payload'
import config from '@/payload.config'

let cachedPayload: any = null

/**
 * Get Payload instance for use in API routes and server components
 * Caches the instance to avoid multiple initializations
 */
export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayload({ config })
  return cachedPayload
}

/**
 * Type-safe wrapper for Payload queries
 */
export async function payloadQuery<T = any>(
  collection: string,
  query: any = {}
): Promise<T[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection,
    ...query,
  })
  return result.docs as T[]
}

/**
 * Type-safe wrapper for Payload single document query
 */
export async function payloadFindById<T = any>(
  collection: string,
  id: string
): Promise<T | null> {
  const payload = await getPayloadClient()
  try {
    const result = await payload.findByID({
      collection,
      id,
    })
    return result as T
  } catch {
    return null
  }
}

/**
 * Type-safe wrapper for Payload create
 */
export async function payloadCreate<T = any>(
  collection: string,
  data: any
): Promise<T> {
  const payload = await getPayloadClient()
  const result = await payload.create({
    collection,
    data,
  })
  return result as T
}

/**
 * Type-safe wrapper for Payload update
 */
export async function payloadUpdate<T = any>(
  collection: string,
  id: string,
  data: any
): Promise<T> {
  const payload = await getPayloadClient()
  const result = await payload.update({
    collection,
    id,
    data,
  })
  return result as T
}

/**
 * Type-safe wrapper for Payload delete
 */
export async function payloadDelete(
  collection: string,
  id: string
): Promise<void> {
  const payload = await getPayloadClient()
  await payload.delete({
    collection,
    id,
  })
}
