<script setup lang="ts">
  import { useAccessibility } from '@/composables/useAccessibility'
  import { useI18n } from '@/composables/useI18n'

  const { skipLinkRef, handleSkipLink } = useAccessibility()
  const { t } = useI18n()
</script>

<template>
  <a
    ref="skipLinkRef"
    href="#main-content"
    @click="handleSkipLink"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    :aria-label="t('common.skipToMainContent')"
  >
    {{ t('common.skipToMainContent') }}
  </a>
</template>
