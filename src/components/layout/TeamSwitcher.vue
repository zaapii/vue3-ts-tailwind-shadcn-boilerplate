<script setup lang="ts">
  import { ChevronsUpDown } from 'lucide-vue-next'
  import { type Component, ref, watch } from 'vue'


  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
  import { useTheme } from '@/composables/useTheme'

  interface Team {
    name: string
    logo: Component
  }

  const props = defineProps<{
    teams: Team[]
  }>()

  const { isMobile } = useSidebar()
  const { isDark } = useTheme()

  const activeTeam = ref(
    props.teams.find(team => team.name === (isDark.value ? 'dark' : 'light')) || props.teams[0]
  )


  watch(isDark, value => {
    activeTeam.value = props.teams.find(team => team.name === (value ? 'dark' : 'light')) || props.teams[0]
  })
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            >
              <component :is="activeTeam.logo" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">
                {{ activeTeam.name }}
              </span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground"> Teams </DropdownMenuLabel>
          <DropdownMenuItem
            v-for="(team, index) in teams"
            :key="team.name"
            class="gap-2 p-2"
            @click="activeTeam = team"
          >
            <div class="flex size-6 items-center justify-center rounded-sm border">
              <component :is="team.logo" class="size-3.5 shrink-0" />
            </div>
            {{ team.name }}
            <DropdownMenuShortcut>{{ index + 1 }}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
