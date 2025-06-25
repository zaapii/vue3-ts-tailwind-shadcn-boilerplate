import { vi } from 'vitest';
import { ref } from 'vue';
import './__mocks__/vuei18n';

vi.mock('vue-i18n', () => ({
  createI18n: vi.fn(() => ({
    install: vi.fn(),
    global: {
      locale: ref('en'),
      t: vi.fn((key: string) => key)
    }
  })),
  useI18n: vi.fn(() => ({
    t: vi.fn((key: string) => key),
    locale: ref('en'),
    currentLocale: ref('en'),
    currentLocaleInfo: ref({
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    }),
    availableLocales: ref([]),
    changeLocale: vi.fn(),
    initializeLocale: vi.fn(),
    SUPPORTED_LOCALES: [
      {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸'
      },
      {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸'
      },
      {
        code: 'de',
        name: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪'
      }
    ]
  }))
}))

vi.mock('vue-sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

vi.mock('@/services/api', () => ({
  useSwApiQuery: vi.fn(() => ({
    data: ref([]),
    isLoading: ref(false),
    isError: ref(false),
    error: ref(null),
    refetch: vi.fn(),
  })),
}));


global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ results: [], count: 0 }),
  })
) as any; 