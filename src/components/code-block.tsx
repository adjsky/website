import React, { useRef, useEffect, useState } from "react"
import clsx from "clsx"

import convertPxToRem from "@/functions/convert-px-to-rem"
import convertRemToPx from "@/functions/convert-rem-to-px"
import useAnimatedTyping from "@/hooks/use-animated-typing"
import useAvailableLines from "@/hooks/use-available-lines"

const fontSize = 1.125
const lineHeight = 1.5625
const charWidth = 0.675

type Offset = {
  y: number
  x: number
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [offset, setOffset] = useState<Offset | null>(null)
  const codeBlockRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!codeBlockRef.current) {
      return
    }

    const computeOffset = () => {
      const lineNumbersElement =
        codeBlockRef.current?.firstElementChild?.firstElementChild
      if (!lineNumbersElement) {
        return
      }

      const boundingRect = lineNumbersElement.getBoundingClientRect()

      const scrollOffsetLeft = codeBlockRef.current.scrollLeft
      const lineNumbersWidth = boundingRect.width - scrollOffsetLeft

      const topOffset = 0.5
      const scrollOffsetTop = convertPxToRem(codeBlockRef.current.scrollTop)

      setOffset({
        x: convertPxToRem(lineNumbersWidth),
        y: topOffset - scrollOffsetTop
      })
    }

    computeOffset()
    codeBlockRef.current.addEventListener("scroll", computeOffset)
  }, [])

  const { typed, line, position, typing } = useAnimatedTyping(code)
  const availableLines = useAvailableLines(
    codeBlockRef,
    convertRemToPx(lineHeight)
  )

  const lines = typed.split("\n")

  return (
    <div className="relative flex w-full flex-1 flex-col pt-2 pb-16">
      {offset && (
        <Cursor
          offset={offset}
          line={line}
          position={position}
          typing={typing}
        />
      )}
      <div
        className="flex w-full flex-1 flex-col overflow-auto font-mono"
        style={{
          fontSize: `${fontSize}rem`,
          lineHeight: `${lineHeight}rem`
        }}
        ref={codeBlockRef}
      >
        {lines.map((line, index) => (
          <div className="flex items-center" key={index}>
            <div className="pl-6 pr-3 font-medium text-yellow">{index + 1}</div>
            <div>
              <span className="whitespace-nowrap text-white">{line}</span>
            </div>
          </div>
        ))}
        {Array.from({ length: availableLines - typed.split("\n").length }).map(
          (_, index) => (
            <div
              className="absolute flex items-center"
              style={{
                top: `${
                  (index + lines.length) * lineHeight + (offset?.y ?? 0)
                }rem`
              }}
              key={index}
            >
              <div className="pl-1 font-[Times] font-bold text-purple">~</div>
            </div>
          )
        )}
      </div>
      <div className="relative px-1 font-mono text-lg font-semibold">
        <div className="text-black flex w-full justify-between bg-white leading-snug">
          <span>me.ts [+]</span>
          <div className="flex gap-28">
            <span>4,0-1</span>
            <span>All</span>
          </div>
        </div>
        {typing && <div className="absolute text-white">-- INSERT --</div>}
      </div>
    </div>
  )
}

const Cursor: React.FC<{
  offset: Offset
  line: number
  position: number
  typing?: boolean
}> = ({ offset, line, position, typing }) => {
  return (
    <div
      className={clsx("absolute")}
      style={{
        top: `${offset.y + (line - 1) * lineHeight}rem`,
        left: `${offset.x + position * charWidth}rem`
      }}
    >
      <div
        className=" bg-white"
        style={{
          width: typing ? "1px" : `${charWidth}rem`,
          height: `${lineHeight}rem`
        }}
      />
    </div>
  )
}

export default CodeBlock
