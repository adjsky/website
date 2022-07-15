import * as React from "react"

const useToggle = (initialValue = false) =>
  React.useReducer((toggled) => !toggled, initialValue)

export default useToggle
