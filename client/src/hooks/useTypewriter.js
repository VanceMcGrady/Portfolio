import { useState, useEffect } from 'react'

const phrases = [
  'Building robust, scalable applications with elegant solutions.',
  'Turning complex problems into simple solutions.',
  'Creating modern web experiences that perform and delight.',
  'Passionate about clean code and user-centric design.',
]

export function useTypewriter() {
  const [text, setText] = useState('')

  useEffect(() => {
    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex]
      let delay

      if (isDeleting) {
        charIndex--
        setText(currentPhrase.substring(0, charIndex))
        delay = 50
      } else {
        charIndex++
        setText(currentPhrase.substring(0, charIndex))
        delay = 100
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true
        delay = 1000
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        delay = 500
      }

      timeoutId = setTimeout(typeWriter, delay)
    }

    timeoutId = setTimeout(typeWriter, 100)
    return () => clearTimeout(timeoutId)
  }, [])

  return text
}
