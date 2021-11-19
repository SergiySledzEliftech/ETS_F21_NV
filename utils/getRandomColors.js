export default function getRandomColors (numberOfColors, transparentRatio) {
  const colors = []

  for (let x = 0; x < numberOfColors; x++) {
    colors.push(`rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)},${transparentRatio})`)
  }

  return colors
}
