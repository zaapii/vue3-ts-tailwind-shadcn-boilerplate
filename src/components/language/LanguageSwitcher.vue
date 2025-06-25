<script setup lang="ts">
  import { Globe } from 'lucide-vue-next'
  import { computed } from 'vue'

  import { Button } from '@/components/ui/button'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import { useI18n, type SupportedLocale } from '@/composables/useI18n'

  const { currentLocaleInfo, availableLocales, changeLocale, t } = useI18n()

  const handleLocaleChange = (locale: SupportedLocale) => {
    changeLocale(locale)
  }

  const currentLocaleDisplay = computed(() => ({
    flag: currentLocaleInfo.value.flag,
    name: currentLocaleInfo.value.nativeName,
  }))
</script>

<template>
  <div class="flex gap-2 items-center">
    <span class="hidden md:block">{{ t('common.currentLocale') }}:</span>
    <span class="flex items-center gap-2">
      <span class="text-lg" role="img" :aria-label="`${currentLocaleDisplay.name} flag`">
        {{ currentLocaleDisplay.flag }}
      </span>
      <span class="text-sm">{{ currentLocaleDisplay.name }}</span>
    </span>
  </div>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="default"
        size="icon"
        class="h-9 w-9"
        :aria-label="`${t('common.switchTo')} ${currentLocaleDisplay.name}`"
      >
        <Globe class="h-4 w-4" aria-hidden="true" />
        <span class="sr-only">{{ currentLocaleDisplay.name }}</span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-48">
      <DropdownMenuItem
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="handleLocaleChange(locale.code)"
        class="flex items-center gap-3 cursor-pointer hover:!bg-slate-100"
      >
        <span class="text-lg" role="img" :aria-label="`${locale.name} flag`">
          {{ locale.flag }}
        </span>
        <div class="flex flex-col">
          <span class="font-medium text-primary">{{ locale.nativeName }}</span>
          <span class="text-xs text-muted-foreground">{{ locale.name }}</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
