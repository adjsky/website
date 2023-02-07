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
    return () => {
      window.removeEventListener("resize", computeAvailableLines)
    }
  }, [computeAvailableLines])

  return availableLines
}

export default useAvailableLines
