function filterText(string:string): string {
  if (string.includes("_YARDS")) {
    return string.replace("_YARDS","⠀(YARDS)")
  }

  return string.replace(/_/g, '⠀').replace(/^"|"$/g, "")
}

export default filterText