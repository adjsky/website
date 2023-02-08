function convertRemToPx(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export default convertRemToPx
