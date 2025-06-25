<script setup lang="ts">
  import { Eclipse, Skull, Sword, Users } from 'lucide-vue-next'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import TeamSwitcher from '@/components/layout/TeamSwitcher.vue'
  import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
  import type { SidebarProps } from '@/components/ui/sidebar/index'
  import { useI18n } from '@/composables/useI18n'

  import NavMain from './NavMain.vue'

  const props = defineProps<SidebarProps>()
  const route = useRoute()
  const { t } = useI18n()

  const data = computed(() => ({
    teams: [
      {
        name: t('navigation.team1'),
        logo: Sword,
      },
      {
        name: t('navigation.team2'),
        logo: Skull,
      },
    ],
    navMain: [
      {
        title: 'Route 1',
        url: '/route1',
        icon: Users,
        isActive: route.name === 'route1',
      },
      {
        title: 'Route 2',
        url: '/route2',
        icon: Eclipse,
        isActive: route.name === 'route2',
      },
    ],
  }))
</script>

<template>
  <Sidebar v-bind="props" role="navigation" :aria-label="t('common.mainNavigation')">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
  </Sidebar>
</template>
