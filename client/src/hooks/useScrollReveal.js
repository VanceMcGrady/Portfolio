import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          } else {
            entry.target.style.opacity = '0'
            entry.target.style.transform = 'translateY(20px)'
          }
        })
      },
      { rootMargin: '-150px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}
