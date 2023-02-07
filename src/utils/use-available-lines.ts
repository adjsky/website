import React, { useState, useEffect, useCallback } from "react"

const useAvailableLines = (
  ref: React.RefObject<HTMLElement>,
  lineHeight: number
) => {
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

    window.addEventListener("resize", computeAvailableLines)

    let resizeObserver: ResizeObserver | null = null

    if (ref.current) {
      resizeObserver = new ResizeObserver(computeAvailableLines)
      resizeObserver.observe(ref.current)
    }

    return () => {
      window.removeEventListener("resize", computeAvailableLines)

      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [computeAvailableLines, ref])

  return availableLines
}

export default useAvailableLines
