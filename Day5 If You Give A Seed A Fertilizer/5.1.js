const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\r\n')

let sum = 0

console.time("time")

const initialSeeds = data[0].split(": ")[1].split(" ")
let seedChanged = [...initialSeeds.map((_) => false)]

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

      initialSeeds.forEach((k, index) => {
        if (
          seedChanged[index] != true && 
          +mappings.src.from <= +initialSeeds[index] && +initialSeeds[index] <= +mappings.src.to 
        ) {
          initialSeeds[index] = +initialSeeds[index] - (+split[1]) + (+split[0])
          seedChanged[index] = true
        }
        if (initialSeeds[index] === undefined) initialSeeds[index] = k
      })

      startId++
    }

    seedChanged = [...initialSeeds.map((_) => false)]

    startId = null
    endId = null
  }
}

let smallest = initialSeeds[0]

initialSeeds.forEach(v => {
  if (+v < smallest) smallest = +v
})

console.timeEnd("time")
console.log(smallest)

console.log(sum)