import { onMounted, onUnmounted, ref } from 'vue'

export interface AccessibilityOptions {
  enableSkipLinks?: boolean
  enableFocusTrapping?: boolean
  enableAnnouncements?: boolean
}

export function useAccessibility(options: AccessibilityOptions = {}) {
  const {
    enableSkipLinks: _enableSkipLinks = true,
    enableFocusTrapping = true,
    enableAnnouncements = true,
  } = options

  const skipLinkRef = ref<HTMLElement>()
  const mainContentRef = ref<HTMLElement>()
  const trappedElements = ref<HTMLElement[]>([])
  const announcementRef = ref<HTMLElement>()

  const focusElement = (element: HTMLElement | null) => {
    if (element && element.focus) {
      element.setAttribute('data-focus-trap', 'true')
      element.focus()
    }
  }

  const focusFirstFocusable = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableElements.length > 0) {
      focusElement(focusableElements[0] as HTMLElement)
    }
  }

  const focusLastFocusable = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableElements.length > 0) {
      focusElement(focusableElements[focusableElements.length - 1] as HTMLElement)
    }
  }

  const handleSkipLink = () => {
    if (mainContentRef.value) {
      focusElement(mainContentRef.value)
      mainContentRef.value.setAttribute('data-skip-link', 'true')
      mainContentRef.value.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const trapFocus = (event: KeyboardEvent) => {
    if (!enableFocusTrapping || trappedElements.value.length === 0) return

    const currentElement = event.target as HTMLElement
    const container = trappedElements.value[trappedElements.value.length - 1]

    if (!container || !container.contains(currentElement)) return

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (currentElement === firstElement) {
          event.preventDefault()
          focusElement(lastElement)
        }
      } else {
        if (currentElement === lastElement) {
          event.preventDefault()
          focusElement(firstElement)
        }
      }
    }
  }

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!enableAnnouncements || !announcementRef.value) return

    announcementRef.value.setAttribute('aria-live', priority)
    announcementRef.value.textContent = message

    setTimeout(() => {
      if (announcementRef.value) {
        announcementRef.value.textContent = ''
      }
    }, 1000)
  }

  // Keyboard navigation helpers
  const handleKeyNavigation = (
    event: KeyboardEvent,
    options: {
      onEnter?: () => void
      onEscape?: () => void
      onArrowUp?: () => void
      onArrowDown?: () => void
      onArrowLeft?: () => void
      onArrowRight?: () => void
    }
  ) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        options.onEnter?.()
        break
      case 'Escape':
        event.preventDefault()
        options.onEscape?.()
        break
      case 'ArrowUp':
        event.preventDefault()
        options.onArrowUp?.()
        break
      case 'ArrowDown':
        event.preventDefault()
        options.onArrowDown?.()
        break
      case 'ArrowLeft':
        event.preventDefault()
        options.onArrowLeft?.()
        break
      case 'ArrowRight':
        event.preventDefault()
        options.onArrowRight?.()
        break
    }
  }

  const addFocusTrap = (element: HTMLElement) => {
    element.setAttribute('data-test-focus-trap', 'true')
    trappedElements.value.push(element)
  }

  const removeFocusTrap = (element: HTMLElement) => {
    element.removeAttribute('data-test-focus-trap')
    const index = trappedElements.value.indexOf(element)
    if (index > -1) {
      trappedElements.value.splice(index, 1)
    }
  }

  const isHighContrast = (ratio: number): boolean => {
    return ratio >= 4.5
  }

  onMounted(() => {
    if (enableFocusTrapping) {
      document.addEventListener('keydown', trapFocus)
    }
  })

  onUnmounted(() => {
    if (enableFocusTrapping) {
      document.removeEventListener('keydown', trapFocus)
    }
  })

  return {
    // Refs
    skipLinkRef,
    mainContentRef,
    announcementRef,

    // Focus management
    focusElement,
    focusFirstFocusable,
    focusLastFocusable,

    // Skip links
    handleSkipLink,

    // Focus trapping
    addFocusTrap,
    removeFocusTrap,

    // Announcements
    announce,

    // Keyboard navigation
    handleKeyNavigation,

    // Color contrast
    isHighContrast,
  }
}
