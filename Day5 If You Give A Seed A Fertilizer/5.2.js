const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\r\n')

let sum = 0

console.time("time")

const initialSeeds = data[0].split(": ")[1].split(" ")

const ranges = []

let x = 0
while(x < initialSeeds.length) {
  ranges.push({
    from: +initialSeeds[x],
    to: +initialSeeds[x] + +initialSeeds[x+1]
  })

x += 2
}

console.log(ranges)

let startId = null
let endId = null

for(let i = 2; i <= data.length; i++) {
  if (data[i] !== undefined && data[i].includes("map:")) {
    startId = i + 1
  }
  if (data[i] === "" || data[i] === undefined) {
    endId = i - 1
  }

  if (startId && endId) {
    while (startId <= endId) {
      let split = data[startId].split(" ")
      const mappings = ({
        dest: {
          from: +split[0],
          to: +split[0] + +split[2],
        },
        src: {
          from: +split[1],
          to: +split[1] + +split[2],
        }
      })

      ranges.forEach(range => {
        if (+mappings.src.from <= rang)
  
        actualSeedRange.forEach((k, index) => {
          if (
            seedChanged[index] != true && 
            +mappings.src.from <= +actualSeedRange[index] && +actualSeedRange[index] <= +mappings.src.to
          ) {
            actualSeedRange[index] = +actualSeedRange[index] - (+split[1]) + (+split[0])
          }
          if (actualSeedRange[index] === undefined) actualSeedRange[index] = k
        })
      })

      startId++
    }

    startId = null
    endId = null
  }
}

let smallest = actualSeedRange[0]

actualSeedRange.forEach(v => {
  if (+v < smallest) smallest = +v
})

smallestArr.push(smallest)

let realSmallest = smallestArr[0]

smallestArr.forEach(v => {
  if (+v < realSmallest) realSmallest = +v
})

console.timeEnd("time")
console.log(realSmallest)

console.log(sum)