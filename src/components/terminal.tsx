import React, { useState } from "react"
import clsx from "clsx"

import ClientOnly from "./client-only"
import TerminalHeader from "./terminal-header"
import CodeBlock from "./code-block"

const code = `// Who am I?
let title = "fullstack dev"
let name = "Kirill Timchenko"
let location = "St. Petersburg, Russia"

let hobby = [
  "programming",
  "drawing",
  "programming",
  "designing"
]

// Contacts
let email = "infiernodeltroel@gmail.com"
let github = "https://github.com/adjsky"
`

const Terminal: React.FC = () => {
  const [maximized, setMaximized] = useState(false)

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div
        className={clsx(
          "z-10 flex h-full w-full flex-col overflow-hidden rounded-t-[0.25rem] bg-primary/90 shadow-terminal transition-all",
          !maximized && "md:max-h-[420px] md:max-w-[534px]",
          maximized && "md:max-h-full md:max-w-full"
        )}
      >
        <TerminalHeader
          onMaximize={(state) => setMaximized(state)}
          onMinimize={() => {
            alert("if this happens, i'll disappear, let's not do this?")
          }}
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
