import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface TypingTextProps {
  words: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  holdDelay?: number
}

/**
 * Lightweight typing/deleting loop across a list of words.
 * Falls back to the first word when the user prefers reduced motion,
 * and exposes a screen-reader-friendly static string.
 */
export default function TypingText({
  words,
  className = '',
  typeSpeed = 62,
  deleteSpeed = 30,
  holdDelay = 1600,
}: TypingTextProps) {
  const reduceMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState(words[0] ?? '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setText(words[0] ?? '')
      return
    }

    const word = words[wordIndex % words.length]
    let timeout: number

    if (!deleting) {
      if (text.length < word.length) {
        timeout = window.setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed)
      } else {
        timeout = window.setTimeout(() => setDeleting(true), holdDelay)
      }
    } else {
      if (text.length > 0) {
        timeout = window.setTimeout(() => setText(word.slice(0, text.length - 1)), deleteSpeed)
      } else {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }
    }

    return () => window.clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, reduceMotion, typeSpeed, deleteSpeed, holdDelay])

  return (
    <span className={className}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.12em] bg-lime animate-caret" />
      </span>
    </span>
  )
}
