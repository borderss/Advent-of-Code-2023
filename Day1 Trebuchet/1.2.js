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
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
}

let map = {
  one: [],
  two: [],
  three: [],
  four: [],
  five: [],
  six: [],
  seven: [],
  eight: [],
  nine: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
}

let sum = 0

const findIndexes = (map, keys, v) => {
  keys.forEach((key) => {
    const first = v.indexOf(key)
    const last = v.lastIndexOf(key)

    if (first !== -1) map[key][0] = (first)
    if (last !== -1 && last !== first) map[key][1] = (last)
  })
}

const findSmallest = (map, keys) => {
  let smallestKey = null
  keys.forEach((key) => {
    let c = map[key]
    if (c.length > 0) {
      if (smallestKey === null || c[0] < map[smallestKey][0]) smallestKey = key
    }
  })
  return dict[smallestKey]
}

const findLargest = (map, keys) => {
  let largestKey = null
  keys.forEach((key) => {
    let c = map[key]
    let l = map[largestKey]
    if (c.length > 0) {
      if (largestKey === null || c[c.length - 1] > l[l.length - 1]) largestKey = key
    }
  })

  return dict[largestKey]
}

data.forEach((v)=>{
  map = {
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
    seven: [],
    eight: [],
    nine: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  }

  const keys = Object.keys(map)

  findIndexes(map, keys, v)

  a = findSmallest(map, keys)
  b = findLargest(map, keys)

  sum += +a*10 + +b
})
console.timeEnd("time")

console.log(sum)