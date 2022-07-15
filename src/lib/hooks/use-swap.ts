import * as React from "react"

import useToggle from "./use-toggle"

export type UseSwapProps = {
  content: string[]
  hideDuration: number
  swapInterval: number
}

const useSwap = ({ content, hideDuration, swapInterval }: UseSwapProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [hidden, toggleHidden] = useToggle()

  React.useEffect(() => {
    const interval = setInterval(async () => {
      toggleHidden()

      await new Promise((resolve) => setTimeout(resolve, hideDuration))

      toggleHidden()
      setCurrentIndex((prev) => {
        const next = prev + 1

        if (next > content.length - 1) {
          return 0
        }

        return next
      })
    }, swapInterval)

    return () => clearInterval(interval)
  }, [content, hideDuration, swapInterval])

  return { display: content[currentIndex], hidden }
}

export default useSwap
