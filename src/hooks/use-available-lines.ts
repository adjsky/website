import React, { useState, useEffect, useCallback } from "react"

const useAvailableLines = (
  ref: React.RefObject<HTMLElement>,
  lineHeight: number
) => {
  const [availableLines, setAvailableLines] = useState(0)

  const computeAvailableLines = useCallback(() => {
    const fullHeight = ref.current?.getBoundingClientRect().height

    if (!fullHeight) {
      return
    }

    setAvailableLines(Math.trunc(fullHeight / lineHeight))
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
