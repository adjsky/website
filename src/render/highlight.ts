import hljs from "highlight.js"

function highlight(code: string) {
  const result = hljs.highlightAuto(code, ["typescript"])

  return result.value
}

export default highlight
