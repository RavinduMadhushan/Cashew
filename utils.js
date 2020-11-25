exports.padZeros = function padZeros(n) {
  return n.toLocaleString('en', {
    minimumIntegerDigits: 5,
    minimumFractionDigits: 0,
    useGrouping: false,
  })
}

console.log(this.padZeros(111))
