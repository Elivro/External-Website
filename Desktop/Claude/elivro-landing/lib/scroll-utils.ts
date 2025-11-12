/**
 * Scroll utilities for smooth scrolling with navbar offset
 */

// Constants
export const NAVBAR_HEIGHT = 64 // 16 * 4 = 64px (h-16 in Tailwind)
export const SCROLL_OFFSET = 20 // Extra padding from navbar

/**
 * Smoothly scrolls to a section by ID with navbar offset
 * @param id - The HTML id of the section to scroll to
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - NAVBAR_HEIGHT - SCROLL_OFFSET

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Smoothly scrolls to the top of the page
 */
export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
