import { useQuery } from '@tanstack/vue-query'
import ky, { type Hooks, type KyInstance, type KyRequest, type KyResponse } from 'ky'

export interface KyConfig {
  baseURL?: string
  timeout?: number
  retry?: number
  hooks?: {
    beforeRequest?: Array<(request: KyRequest, options: KyConfig) => void>
    afterResponse?: Array<(request: KyRequest, options: KyConfig, response: KyResponse) => void>
  }
}

export function createKyInstance(config: KyConfig = {}): KyInstance {
  return ky.create({
    prefixUrl: config.baseURL,
    timeout: config.timeout ?? 10000,
    retry: config.retry ?? 3,
    hooks: config.hooks as Hooks,
  })
}

export const defaultKy = createKyInstance()
export type KyQueryFn<TData = unknown> = (ky: KyInstance) => Promise<TData>

export function useKyQuery<TData = unknown, TError = Error>(options: {
  queryKey: string[]
  queryFn: KyQueryFn<TData>
  kyInstance?: KyInstance
  enabled?: boolean
  staleTime?: number
  cacheTime?: number
  refetchOnWindowFocus?: boolean
  retry?: boolean | number
}) {
  const { queryFn, kyInstance = defaultKy, ...queryOptions } = options
  const enhancedQueryFn = () => queryFn(kyInstance)

  return useQuery<TData, TError>({
    ...queryOptions,
    queryFn: enhancedQueryFn,
  })
}

export function createApiClient(config: KyConfig) {
  const kyInstance = createKyInstance(config)

  return {
    ky: kyInstance,
    useQuery: <TData = unknown, TError = Error>(
      options: Omit<Parameters<typeof useKyQuery<TData, TError>>[0], 'kyInstance'>
    ) => useKyQuery({ ...options, kyInstance }),
  }
}
