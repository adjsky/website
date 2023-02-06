import { useEffect, useState } from "react"

const useAnimatedTyping = (code: string) => {
  const [position, setPosition] = useState(0)
  const [line, setLine] = useState(1)

  const [typed, setTyped] = useState("")
  const [typing, setTyping] = useState(false)
  useEffect(() => {
    let timeout: number

    const animateCode = (index = 0) => {
      const currentChar = code[index]

      const isNewLine = currentChar == "\n"
      if (isNewLine) {
        setLine((prev) => prev + 1)
        setPosition(0)
      } else {
        setPosition((prev) => prev + 1)
      }

      setTyped((prev) => prev + currentChar)

      if (index == code.length - 1) {
        timeout = setTimeout(() => setTyping(false), 500)
      } else {
        timeout = setTimeout(
          () => animateCode(index + 1),
          isNewLine ? 400 : 100
        )
      }
    }

    setTimeout(() => {
      setTyping(true)
      animateCode(0)
    }, 500)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [code])

  return { typed, typing, line, position }
}

export default useAnimatedTyping
