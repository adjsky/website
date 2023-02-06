function convertPxToRem(px: number) {
  const documentFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  )

  return px * (1 / documentFontSize)
}

export default convertPxToRem
