<script setup lang="ts">
  import { computed, type Component } from 'vue'
  import type { RouteLocationNormalizedLoaded } from 'vue-router'

  interface Props {
    component: Component
    route: RouteLocationNormalizedLoaded
  }

  const props = defineProps<Props>()

  const transitionKey = computed(() => props.route.path)
</script>

<template>
  <Transition
    name="page"
    mode="out-in"
    appear
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 blur-sm"
    enter-to-class="opacity-100 translate-y-0 blur-none"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0 blur-none"
    leave-to-class="opacity-0 -translate-y-2 blur-sm"
  >
    <component
      :is="component"
      :key="transitionKey"
      class="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
    />
  </Transition>
</template>

<style scoped>
  @media (prefers-reduced-motion: reduce) {
    .page-enter-active,
    .page-leave-active {
      transition: none !important;
    }

    .page-enter-from,
    .page-leave-to {
      transform: none !important;
      filter: none !important;
    }
  }
</style>
