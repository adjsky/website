import * as React from "react"
import clsx from "clsx"

import shuffleArray from "@/lib/helpers/shuffle-array"
import useSwap from "@/lib/hooks/use-swap"

import type { UseSwapProps } from "@/lib/hooks/use-swap"

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
