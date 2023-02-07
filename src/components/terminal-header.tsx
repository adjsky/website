import React, { useState } from "react"
import {
  IoCloseOutline,
  IoChevronUpOutline,
  IoChevronDownOutline
} from "react-icons/io5/index.js"
import { TbSquareRotated } from "react-icons/tb/index.js"
import * as Tooltip from "@radix-ui/react-tooltip"
import clsx from "clsx"

type TerminalHeaderProps = {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: (state: boolean) => void
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  onClose,
  onMinimize,
  onMaximize
}) => {
  const [maximized, setMaximized] = useState(false)

  return (
    <div className="relative flex h-[20px] flex-shrink-0 items-center justify-end px-1">
      <span className="absolute left-1/2 -translate-x-1/2 text-[0.5rem] text-white">
        adjsky@192:~
      </span>
      <div className="flex gap-[0.1rem]">
        <ActionButton tooltip="Minimize" onClick={onMinimize}>
          <IoChevronDownOutline className="h-3 w-3 stroke-white group-hover:stroke-primary" />
        </ActionButton>
        <ActionButton
          tooltip={maximized ? "Restore" : "Maximize"}
          onClick={() => {
            setMaximized(!maximized)
            onMaximize && onMaximize(!maximized)
          }}
        >
          {maximized ? (
            <TbSquareRotated className="h-3 w-3 stroke-white group-hover:stroke-primary" />
          ) : (
            <IoChevronUpOutline className="h-3 w-3 stroke-white group-hover:stroke-primary" />
          )}
        </ActionButton>
        <ActionButton tooltip="Close" variant="close" onClick={onClose}>
          <IoCloseOutline className="h-3 w-3 stroke-white group-hover:stroke-primary" />
        </ActionButton>
      </div>
    </div>
  )
}

const ActionButton: React.FC<
  React.PropsWithChildren<{
    tooltip: string
    variant?: "basic" | "close"
    onClick?: () => void
  }>
> = ({ tooltip, variant = "basic", onClick, children }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={onClick}
            className={clsx(
              "group rounded-full p-px",
              variant == "basic" && "hover:bg-white",
              variant == "close" && "hover:bg-red"
            )}
          >
            {children}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            align="start"
            sideOffset={8}
            alignOffset={8}
            className="z-10 rounded-sm border border-white bg-primary p-1 text-[0.5rem] leading-none text-white"
          >
            {tooltip}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default TerminalHeader
