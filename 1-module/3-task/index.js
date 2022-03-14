function ucFirst(str) {
  let capitalLetter = str.charAt(0).toUpperCase();

  if (str.length > 1) {
    return capitalLetter + str.slice(1)
  } else {
    return capitalLetter
  }
}
