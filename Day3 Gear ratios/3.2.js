const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\r\n')

console.time("time")

const starArr = {}
const re = /(\d+)/g

data.forEach((row, index) => {
  let matches = {}
  while ((match = re.exec(row)) != null ) {
    matches[match.index] = match[0]
  }

  Object.keys(matches).forEach((k) => {
    let before = row.charAt(k-1) || "."
    let after = row.charAt((+k)+matches[k].length) || "."
    let topStr = data[index-1]?.substring(k-1, (+k)+matches[k].length+1) || "."
    let bottomStr = data[index+1]?.substring(k-1, (+k)+matches[k].length+1) || "."

    if (before == "*") {
      if (!starArr[`${k-1}:${index}`]) starArr[`${k-1}:${index}`] = []
      starArr[`${k-1}:${index}`].push(+matches[k])
    }
    if (after == "*") {
      if (!starArr[`${(+k)+matches[k].length}:${index}`]) starArr[`${(+k)+matches[k].length}:${index}`] = []
      starArr[`${(+k)+matches[k].length}:${index}`].push(+matches[k])
    }

    if (topStr.length != matches[k].length+2 || bottomStr.length != matches[k].length+2) {
      if (row.charAt(k-1) == "") {
        topStr = `.${topStr}`
        bottomStr = `.${bottomStr}`
      } else if (row.charAt((+k)+matches[k].length) == "") {
        topStr = `${topStr}.`
        bottomStr = `${bottomStr}.`
      }
    }

    let topStrStar = topStr.indexOf("*")
    let bottomStrStar = bottomStr.indexOf("*")

    if (topStrStar != "-1") {
      topStrStar += (k-1)
            
      if (!starArr[`${topStrStar}:${index-1}`]) starArr[`${topStrStar}:${index-1}`] = []
      starArr[`${topStrStar}:${index-1}`].push(+matches[k])
    }
    if (bottomStrStar != "-1") {
      bottomStrStar += (k-1)

      if (!starArr[`${bottomStrStar}:${index+1}`]) starArr[`${bottomStrStar}:${index+1}`] = []
      starArr[`${bottomStrStar}:${index+1}`].push(+matches[k])
    }
  })
})

let res = 0

Object.keys(starArr).forEach(k=>{
  if (starArr[k].length >= 2) {
    res += +starArr[k][0] * +starArr[k][1]
  }
})

console.timeEnd("time")

console.log(res)