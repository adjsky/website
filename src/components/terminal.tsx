import React, { useState } from "react"
import clsx from "clsx"

import ClientOnly from "./client-only"
import TerminalHeader from "./terminal-header"
import CodeBlock from "./code-block"

const code = `// Who am I?
const name = "Kirill Timchenko"
const location = "St. Petersburg, Russia"

// My preferences
const preferences = [
  "typescript",
  "rust",
  "anime",
  "making games",
  "golang",
  "gaming"
]
`

const Terminal: React.FC = () => {
  const [maximized, setMaximized] = useState(false)

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div
        className={clsx(
          "z-10 flex h-full w-full flex-col overflow-hidden bg-primary/90 shadow-2xl transition-all",
          !maximized && "max-w-[1100px] sm:max-h-[750px]",
          maximized && "max-w-full sm:max-h-full"
        )}
      >
        <TerminalHeader
          onMaximize={() => setMaximized(true)}
          onMinimize={() => setMaximized(false)}
          onClose={() => {
            alert("no, no, you can't close me")
          }}
        />
        <ClientOnly>
          <CodeBlock code={code} />
        </ClientOnly>
      </div>
    </div>
  )
}

export default Terminal
