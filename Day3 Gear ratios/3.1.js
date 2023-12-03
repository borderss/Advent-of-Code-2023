const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\r\n')

const re = /(\d+)/g
const symbolRegex = /[^0-9^.]/g
let sum = 0

data.forEach((row, index) => {
  let matches = {}
  while ((match = re.exec(row)) != null ) {
    matches[match.index] = match[0]
  }

  Object.keys(matches).forEach((k) => {
    const before = row.charAt(k-1) || "."
    const after = row.charAt((+k)+matches[k].length) || "."
    const topStr = data[index-1]?.substring(k-1, (+k)+matches[k].length+1) || "."
    const bottomStr = data[index+1]?.substring(k-1, (+k)+matches[k].length+1) || "."

    if (`${topStr}${before}${after}${bottomStr}`.match(symbolRegex)) {
      sum += +matches[k]
    }
  })
})

console.log(sum)