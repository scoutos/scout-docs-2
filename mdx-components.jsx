import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { YouTube } from './components/youtube'

const themeComponents = getThemeComponents()

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    YouTube,
    ...components
  }
}
