<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { reactiveOmit } from '@vueuse/core'
  import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui'
  import { cn } from '@/lib/utils'

  const props = withDefaults(
    defineProps<
      DropdownMenuItemProps & {
        class?: HTMLAttributes['class']
        inset?: boolean
        variant?: 'default' | 'destructive'
      }
    >(),
    {
      variant: 'default',
    }
  )

  const delegatedProps = reactiveOmit(props, 'inset', 'variant', 'class')

  const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8',
        props.variant === 'destructive' &&
          'text-destructive focus:bg-destructive focus:text-destructive-foreground',
        props.class
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>
