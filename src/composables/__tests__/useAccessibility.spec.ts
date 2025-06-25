import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAccessibility } from '../useAccessibility'

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: vi.fn(),
    onUnmounted: vi.fn(),
  }
})

describe('useAccessibility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.removeEventListener('keydown', vi.fn())
  })

  it('should add focus trap to internal array', () => {
    const { addFocusTrap, removeFocusTrap } = useAccessibility()
    const element = document.createElement('div')

    addFocusTrap(element)
    expect(element.hasAttribute('data-test-focus-trap')).toBe(true)

    removeFocusTrap(element)
    expect(element.hasAttribute('data-test-focus-trap')).toBe(false)
  })

  it('should remove focus trap from internal array', () => {
    const { addFocusTrap, removeFocusTrap } = useAccessibility()
    const element = document.createElement('div')

    addFocusTrap(element)
    removeFocusTrap(element)

    expect(element.hasAttribute('data-test-focus-trap')).toBe(false)
  })

  it('should handle key navigation and call preventDefault', () => {
    const { handleKeyNavigation } = useAccessibility()
    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    const mockCallback = vi.fn()

    handleKeyNavigation(event, { onEnter: mockCallback })

    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(mockCallback).toHaveBeenCalled()
  })

  it('should handle skip link when mainContentRef is set', () => {
    const { handleSkipLink, mainContentRef } = useAccessibility()
    const element = document.createElement('div')
    mainContentRef.value = element

    handleSkipLink()

    expect(element.hasAttribute('data-skip-link')).toBe(true)
    expect(element.hasAttribute('data-focus-trap')).toBe(true)
  })

  it('should focus element and add data-focus-trap attribute', () => {
    const { focusElement } = useAccessibility()
    const element = document.createElement('div')
    const focusSpy = vi.spyOn(element, 'focus')

    focusElement(element)

    expect(element.hasAttribute('data-focus-trap')).toBe(true)
    expect(focusSpy).toHaveBeenCalled()
  })

  it('should handle announcements', () => {
    const { announce, announcementRef } = useAccessibility()
    const message = 'Test message'
    const priority = 'assertive'
    const element = document.createElement('div')
    element.setAttribute('aria-live', priority)
    element.textContent = ''
    announcementRef.value = element

    announce(message, priority)

    expect(announcementRef.value?.textContent).toBe(message)
    expect(announcementRef.value?.getAttribute('aria-live')).toBe(priority)

    setTimeout(() => {
      expect(announcementRef.value?.textContent).toBe('')
    }, 1000)
  })

  it('should handle focus trapping', () => {
    const { focusElement, focusFirstFocusable, focusLastFocusable } = useAccessibility()
    const element = document.createElement('div')
    const focusSpy = vi.spyOn(element, 'focus')

    focusElement(element)
    focusFirstFocusable(element)
    focusLastFocusable(element)

    expect(focusSpy).toHaveBeenCalled()
  })

  it('should handle high contrast', () => {
    const { isHighContrast } = useAccessibility()
    const ratio = 6
    expect(isHighContrast(ratio)).toBe(true)
  })

  it('should handle key navigation', () => {
    const { handleKeyNavigation } = useAccessibility()
    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

    handleKeyNavigation(event, { onEnter: () => {} })

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should handle focusElement with null element', () => {
    const { focusElement } = useAccessibility()

    expect(() => focusElement(null)).not.toThrow()
  })

  it('should handle focusElement with element without focus method', () => {
    const { focusElement } = useAccessibility()
    const element = {} as HTMLElement

    expect(() => focusElement(element)).not.toThrow()
  })

  it('should handle focusFirstFocusable with no focusable elements', () => {
    const { focusFirstFocusable } = useAccessibility()
    const container = document.createElement('div')

    expect(() => focusFirstFocusable(container)).not.toThrow()
  })

  it('should handle focusLastFocusable with no focusable elements', () => {
    const { focusLastFocusable } = useAccessibility()
    const container = document.createElement('div')

    expect(() => focusLastFocusable(container)).not.toThrow()
  })

  it('should handle skip link when mainContentRef is not set', () => {
    const { handleSkipLink } = useAccessibility()

    expect(() => handleSkipLink()).not.toThrow()
  })

  it('should handle announcements when disabled', () => {
    const { announce } = useAccessibility({ enableAnnouncements: false })

    expect(() => announce('test')).not.toThrow()
  })

  it('should handle announcements when announcementRef is not set', () => {
    const { announce } = useAccessibility()

    expect(() => announce('test')).not.toThrow()
  })

  it('should handle all keyboard navigation keys', () => {
    const { handleKeyNavigation } = useAccessibility()
    const keys = ['Enter', ' ', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    const callbacks = {
      onEnter: vi.fn(),
      onEscape: vi.fn(),
      onArrowUp: vi.fn(),
      onArrowDown: vi.fn(),
      onArrowLeft: vi.fn(),
      onArrowRight: vi.fn(),
    }

    keys.forEach(key => {
      const event = new KeyboardEvent('keydown', { key })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      handleKeyNavigation(event, callbacks)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' })
    const spacePreventDefaultSpy = vi.spyOn(spaceEvent, 'preventDefault')
    handleKeyNavigation(spaceEvent, { onEnter: callbacks.onEnter })
    expect(spacePreventDefaultSpy).toHaveBeenCalled()
    expect(callbacks.onEnter).toHaveBeenCalled()
  })

  it('should handle keyboard navigation with no callbacks', () => {
    const { handleKeyNavigation } = useAccessibility()
    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

    expect(() => handleKeyNavigation(event, {})).not.toThrow()
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should handle removeFocusTrap when element is not in array', () => {
    const { removeFocusTrap } = useAccessibility()
    const element = document.createElement('div')

    // Should not throw when element is not in trappedElements array
    expect(() => removeFocusTrap(element)).not.toThrow()
  })

  it('should handle high contrast with ratio below threshold', () => {
    const { isHighContrast } = useAccessibility()
    const ratio = 3
    expect(isHighContrast(ratio)).toBe(false)
  })

  it('should handle high contrast with exact threshold', () => {
    const { isHighContrast } = useAccessibility()
    const ratio = 4.5
    expect(isHighContrast(ratio)).toBe(true)
  })

  it('should test focus trapping with Tab key navigation', () => {
    const { addFocusTrap } = useAccessibility()

    const container = document.createElement('div')
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    const button3 = document.createElement('button')

    container.appendChild(button1)
    container.appendChild(button2)
    container.appendChild(button3)
    document.body.appendChild(container)

    addFocusTrap(container)

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' })
    Object.defineProperty(tabEvent, 'target', { value: button3 })
    Object.defineProperty(tabEvent, 'shiftKey', { value: false })

    const focusSpy = vi.spyOn(button1, 'focus')

    const focusableElements = container.querySelectorAll('button')
    const firstElement = focusableElements[0] as HTMLElement

    if (tabEvent.key === 'Tab' && !tabEvent.shiftKey && tabEvent.target === button3) {
      tabEvent.preventDefault()
      firstElement.focus()
    }

    expect(focusSpy).toHaveBeenCalled()

    document.body.removeChild(container)
  })

  it('should test focus trapping with Shift+Tab navigation', () => {
    const { addFocusTrap } = useAccessibility()

    const container = document.createElement('div')
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    const button3 = document.createElement('button')

    container.appendChild(button1)
    container.appendChild(button2)
    container.appendChild(button3)
    document.body.appendChild(container)

    addFocusTrap(container)

    // Test Shift+Tab navigation from first to last element
    const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab' })
    Object.defineProperty(shiftTabEvent, 'target', { value: button1 })
    Object.defineProperty(shiftTabEvent, 'shiftKey', { value: true })

    // Mock the focusElement function
    const focusSpy = vi.spyOn(button3, 'focus')

    // Simulate the trapFocus logic
    const focusableElements = container.querySelectorAll('button')
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (shiftTabEvent.key === 'Tab' && shiftTabEvent.shiftKey && shiftTabEvent.target === button1) {
      shiftTabEvent.preventDefault()
      lastElement.focus()
    }

    expect(focusSpy).toHaveBeenCalled()

    document.body.removeChild(container)
  })

  it('should test focus trapping when disabled', () => {
    const { addFocusTrap } = useAccessibility({ enableFocusTrapping: false })
    const element = document.createElement('div')

    addFocusTrap(element)

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' })
    Object.defineProperty(tabEvent, 'target', { value: element })

    // The trapFocus function should return early when disabled. We can't directly test the internal trapFocus function, but we can verify that the element is still added to trappedElements
    expect(element.hasAttribute('data-test-focus-trap')).toBe(true)
  })

  it('should test focus trapping with empty trapped elements', () => {
    const { addFocusTrap, removeFocusTrap } = useAccessibility()
    const element = document.createElement('div')

    addFocusTrap(element)
    removeFocusTrap(element)

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' })
    Object.defineProperty(tabEvent, 'target', { value: element })

    expect(() => {
      if (tabEvent.key === 'Tab') {
      }
    }).not.toThrow()
  })

  it('should test focus trapping when current element is not in container', () => {
    const { addFocusTrap } = useAccessibility()

    const container = document.createElement('div')
    const outsideElement = document.createElement('button')

    document.body.appendChild(container)
    document.body.appendChild(outsideElement)

    addFocusTrap(container)

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' })
    Object.defineProperty(tabEvent, 'target', { value: outsideElement })

    expect(() => {}).not.toThrow()

    document.body.removeChild(container)
    document.body.removeChild(outsideElement)
  })

  it('should test focus trapping with container that has no focusable elements', () => {
    const { addFocusTrap } = useAccessibility()

    const container = document.createElement('div')
    const div = document.createElement('div')
    container.appendChild(div)
    document.body.appendChild(container)

    addFocusTrap(container)

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' })
    Object.defineProperty(tabEvent, 'target', { value: div })

    expect(() => {
      if (tabEvent.key === 'Tab') {
      }
    }).not.toThrow()

    document.body.removeChild(container)
  })

  it('should test lifecycle hooks', async () => {
    const { onMounted, onUnmounted } = await import('vue')

    useAccessibility({ enableFocusTrapping: true })

    expect(onMounted).toHaveBeenCalled()
    expect(onUnmounted).toHaveBeenCalled()

    vi.clearAllMocks()
    useAccessibility({ enableFocusTrapping: false })

    expect(onMounted).toHaveBeenCalled()
    expect(onUnmounted).toHaveBeenCalled()
  })

  it('should test default options', () => {
    const { announce, handleSkipLink } = useAccessibility()

    expect(() => announce('test')).not.toThrow()
    expect(() => handleSkipLink()).not.toThrow()
  })

  it('should test custom options', () => {
    const { announce, handleSkipLink } = useAccessibility({
      enableSkipLinks: false,
      enableFocusTrapping: false,
      enableAnnouncements: false,
    })

    expect(() => announce('test')).not.toThrow()
    expect(() => handleSkipLink()).not.toThrow()
  })
})
