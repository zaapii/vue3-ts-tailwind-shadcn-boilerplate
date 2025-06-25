<script setup lang="ts">
  import { Moon, Sun } from 'lucide-vue-next'

  import { Switch } from '@/components/ui/switch'
  import { useI18n } from '@/composables/useI18n'
  import { useTheme } from '@/composables/useTheme'

  const { isDark, toggleMode } = useTheme()
  const { t } = useI18n()
</script>

<template>
  <div
    class="flex items-center gap-4 md:gap-8"
    role="group"
    aria-label="Theme and faction controls"
  >
    <div class="flex items-center gap-2">
      <Sun class="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <Switch
        :model-value="isDark"
        @update:model-value="toggleMode"
        class="data-[state=unchecked]:bg-primary"
        :aria-label="`${t('common.switchTo')} ${isDark ? t('common.lightMode') : t('common.darkMode')}`"
        :aria-checked="isDark"
        role="switch"
      />
      <Moon class="h-4 w-4 text-muted-foreground" aria-hidden="true" />
    </div>
  </div>
</template>
