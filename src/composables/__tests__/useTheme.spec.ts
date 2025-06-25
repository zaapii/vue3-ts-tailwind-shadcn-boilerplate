import { describe, it, expect } from 'vitest'

import { useTheme } from '../useTheme'

describe('useTheme', () => {
  it('should return the correct theme', () => {
    const { isDark } = useTheme()
    expect(isDark.value).toBe(false)
  })

  it('should return the correct theme', () => {
    const { isDark, setTheme } = useTheme()
    setTheme('dark')
    expect(isDark.value).toBe(true)
  })
})
