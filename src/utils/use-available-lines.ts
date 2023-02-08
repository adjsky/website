import { useState, useEffect, useCallback } from "react"
import type { RefObject } from "react"

const useAvailableLines = (ref: RefObject<HTMLElement>, lineHeight: number) => {
  const [availableLines, setAvailableLines] = useState(0)

  const computeAvailableLines = useCallback(() => {
    if (!ref.current) {
      return
    }

    const fullHeight = ref.current.getBoundingClientRect().height
    const cs = getComputedStyle(ref.current)

    const actualHeight = fullHeight - parseFloat(cs.paddingTop)

    setAvailableLines(Math.trunc(actualHeight / lineHeight))
  }, [ref, lineHeight])

  useEffect(() => {
    computeAvailableLines()

    const resizeObserver = new ResizeObserver(computeAvailableLines)
    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [computeAvailableLines, ref])

  return availableLines
}

export default useAvailableLines
