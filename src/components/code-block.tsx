import "@/styles/hljs.css"
import React, { useRef, useEffect, useState } from "react"
import hljs from "highlight.js"

import convertPxToRem from "@/utils/convert-px-to-rem"
import convertRemToPx from "@/utils/convert-rem-to-px"
import useAnimatedTyping from "@/utils/use-animated-typing"
import useAvailableLines from "@/utils/use-available-lines"

import type { RefObject } from "react"

const fontSize = 0.875
const lineHeight = fontSize * 1.25
const charWidth = fontSize * 0.6

type Offset = {
  y: number
  x: number
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const codeRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const lineCountRef = useRef<HTMLDivElement>(null)
  const offset = useOffset(scrollContainerRef, lineCountRef)

  const { typed, line, position, typing } = useAnimatedTyping(code)
  const availableLines = useAvailableLines(
    scrollContainerRef,
    convertRemToPx(lineHeight)
  )

  useEffect(() => {
    if (!codeRef.current) {
      return
    }

    hljs.highlightElement(codeRef.current)
  }, [codeRef, typed])

  const lines = typed.split("\n")

  return (
    <>
      <div
        className="relative flex w-full flex-1 flex-col overflow-auto pt-[0.375rem] font-mono"
        ref={scrollContainerRef}
      >
        {offset && (
          <Cursor
            offset={offset}
            line={line}
            position={position}
            typing={typing}
          />
        )}
        <div
          className="flex"
          style={{
            fontSize: `${fontSize}rem`,
            lineHeight: `${lineHeight}rem`
          }}
        >
          <div className="flex-shrink-0 select-none" ref={lineCountRef}>
            {lines.map((_, index) => (
              <div
                key={index}
                className="w-9 pr-2 text-end font-medium text-yellow"
              >
                {index + 1}
              </div>
            ))}
            {Array.from({
              length: availableLines - lines.length
            }).map((_, index) => (
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
            ))}
          </div>
          <pre className="w-full">
            <code className="typescript block w-full" ref={codeRef}>
              {typed}
            </code>
          </pre>
        </div>
      </div>
      <div className="relative h-14 flex-shrink-0 px-1 font-mono text-xs font-semibold">
        <div className="text-black flex w-full justify-between bg-white leading-snug">
          <span>me.ts</span>
          <div className="flex gap-8 sm:gap-[5.2rem]">
            <span>
              {line},{typing ? position + 1 : `${position}-${position + 1}`}
            </span>
            <span>All</span>
          </div>
        </div>
        {typing && (
          <div className="absolute leading-normal text-white">-- INSERT --</div>
        )}
      </div>
    </>
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
      className="absolute"
      style={{
        top: `${offset.y + (line - 1) * lineHeight}rem`,
        left: `${offset.x + position * charWidth}rem`
      }}
    >
      <div
        className="bg-white"
        style={{
          width: typing ? "1px" : `${charWidth}rem`,
          height: `${lineHeight}rem`
        }}
      />
    </div>
  )
}

const useOffset = (
  scrollContainerRef: RefObject<HTMLDivElement>,
  lineCountRef: RefObject<HTMLDivElement>
) => {
  const [offset, setOffset] = useState<Offset | null>(null)

  useEffect(() => {
    if (!scrollContainerRef.current) {
      return
    }

    const computeOffset = () => {
      if (!scrollContainerRef.current || !lineCountRef.current) {
        return
      }

      const lineCountElement = lineCountRef.current.firstElementChild
      if (!lineCountElement) {
        return
      }

      const boundingRect = lineCountElement.getBoundingClientRect()
      const lineNumbersWidth = boundingRect.width

      const topOffset = convertPxToRem(
        parseFloat(getComputedStyle(scrollContainerRef.current).paddingTop)
      )

      setOffset({
        x: convertPxToRem(lineNumbersWidth),
        y: topOffset
      })
    }

    computeOffset()
    scrollContainerRef.current.addEventListener("scroll", computeOffset)
  }, [lineCountRef, scrollContainerRef])

  return offset
}

export default CodeBlock
