import * as React from "react"
import clsx from "clsx"

import useToggle from "@/lib/hooks/use-toggle"
import useClickOutside from "@/lib/hooks/use-click-outside"

const Burger: React.FC = () => {
  const [menuVisible, toggleMenu] = useToggle()
  const menuRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  useClickOutside(menuRef, (event) => {
    if (
      !(event.target instanceof Node) ||
      buttonRef.current?.contains(event.target) ||
      !menuVisible
    ) {
      return
    }

    toggleMenu()
  })

  return (
    <>
      <button
        ref={buttonRef}
        className="transition-color group flex rounded-sm px-3.5 py-2.5 hover:bg-gray sm:text-xl"
        onClick={toggleMenu}
      >
        <span>burger.open</span>
        <span className="text-pink transition-transform group-hover:translate-x-1">
          (
        </span>
        <span className="text-pink transition-transform group-hover:translate-x-2">
          )
        </span>
      </button>
      <div
        ref={menuRef}
        className={clsx(
          "fixed top-0 right-0 z-50 h-screen bg-gray p-10 pr-20 transition-transform",
          !menuVisible && "translate-x-full"
        )}
      >
        <nav></nav>
      </div>
    </>
  )
}

export default Burger
