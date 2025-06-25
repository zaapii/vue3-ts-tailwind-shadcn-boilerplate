<script setup lang="ts">
  import AppSidebar from '@/components/layout/AppSidebar.vue'
  import Header from '@/components/layout/Header.vue'
  import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
  import { useI18n } from '@/composables/useI18n'

  const { t } = useI18n()
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <Header />
      <main
        class="flex flex-1 flex-col gap-6 p-6 pt-4 overflow-auto"
        role="main"
        :aria-label="t('common.mainContent')"
      >
        <div class="container mx-auto h-full">
          <slot />
        </div>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
