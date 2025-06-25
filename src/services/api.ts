import type { KyRequest, KyResponse } from 'ky'
import { toast } from 'vue-sonner'

import { createApiClient, type KyConfig } from '../composables/useKyQueryFn'

export const apiClient = createApiClient({
  baseURL: import.meta.env.YOUR_API_URL,
  timeout: 10000,
  retry: 3,
  hooks: {
    afterResponse: [
      (request: KyRequest, _options: KyConfig, response: KyResponse) => {
        if (response.status >= 400) {
          toast.error(`Error: ${response.status} ${response.statusText}`, {
            description: `${request.url} failed to load`,
            duration: 3000,
          })
          return
        }

        toast.success(`${request.url} loaded successfully`, {
          duration: 3000,
        })
      },
    ],
  },
})

export const useApiQuery = apiClient.useQuery