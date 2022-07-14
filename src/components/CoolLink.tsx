import * as React from "react"
import clsx from "clsx"

const CoolLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref) => {
  return (
    <a
      {...props}
      ref={ref}
      className={clsx(
        props.className,
        "relative",
        "after:absolute after:left-[-2px] after:right-[-2px] after:bottom-0 after:z-[-1] after:h-0.5 after:bg-gradient-to-r after:from-blue after:to-pink after:transition-all hover:after:h-full"
      )}
    >
      {children}
    </a>
  )
})

CoolLink.displayName = "CoolLink"

export default CoolLink
