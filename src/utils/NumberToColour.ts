const numberToColourGradient = (value: number):string =>  {
  const clampedValue = Math.min(100, Math.max(0, value));

  const red = Math.round((clampedValue / 100) * 255);
  const green = Math.round(((100 - clampedValue) / 100) * 255);

  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');

  return `#${redHex}${greenHex}00`;
}

export default numberToColourGradient