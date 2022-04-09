import {ValuesOf} from './types/ValuesOf'

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const

export type HttpMethod = ValuesOf<typeof HttpMethod>
