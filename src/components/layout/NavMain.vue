<script setup lang="ts">
  import { type LucideIcon } from 'lucide-vue-next'
  import { RouterLink } from 'vue-router'

  import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
  import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from '@/components/ui/sidebar'

  defineProps<{
    items: {
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
      items?: {
        title: string
        url: string
      }[]
    }[]
  }>()
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger as-child>
            <RouterLink :to="item.url">
              <SidebarMenuButton
                :tooltip="item.title"
                :is-active="item.isActive"
                class="cursor-pointer"
              >
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
              </SidebarMenuButton>
            </RouterLink>
          </CollapsibleTrigger>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
