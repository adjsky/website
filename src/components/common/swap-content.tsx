import * as React from "react"
import clsx from "clsx"

import shuffleArray from "@/lib/helpers/shuffle-array"
import useToggle from "@/lib/hooks/use-toggle"

type UseSwapProps = {
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

type SwapContentProps = Partial<UseSwapProps> & {
  transitionDuration?: number
}

const SwapContent: React.FC<
  SwapContentProps & React.HTMLAttributes<HTMLSpanElement>
> = ({
  transitionDuration = 150,
  content = [],
  hideDuration = 200,
  swapInterval = 3000,
  ...props
}) => {
  const shuffledContent = React.useMemo(() => shuffleArray(content), [content])

  const { display, hidden } = useSwap({
    content: shuffledContent,
    hideDuration,
    swapInterval
  })

  return (
    <span
      {...props}
      className={clsx(
        props.className,
        "opacity-1 animate-[fadeIn] transition-opacity",
        hidden && "opacity-0"
      )}
      style={{
        transitionDuration: `${transitionDuration}ms`,
        animationDuration: `${transitionDuration}ms`,
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {display}
    </span>
  )
}

export default SwapContent
