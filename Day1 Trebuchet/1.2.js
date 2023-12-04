const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\n')

console.time("time")

const dict = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

let sum = 0
const keys = [ "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const map = []

data.forEach((v)=>{
  let a = null
  let b = null

  keys.forEach((key) => {
    const mk = map[key] = []
    const first = v.indexOf(key)
    const last = v.lastIndexOf(key)

    if (first !== -1) mk[0] = first
    if (last !== -1 && last !== first) mk[1] = last

    let c = mk
    let l = map[b]
    if (c.length > 0) {
      a === null || c[0] < map[a][0] ? a = key : false
      b === null || c[c.length - 1] > l[l.length - 1] ? b = key : false
    }
  })

  sum += +(dict[a] | +a)*10 + +(dict[b] | +b)
})
console.timeEnd("time")

console.log(sum)