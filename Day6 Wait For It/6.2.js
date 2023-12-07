const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\r\n')

console.time("time")

const times = [data[0].replace(/\s+/g, '').split(":")[1]]
const distances = [data[1].replace(/\s+/g, '').split(":")[1]]

let results = 1

times.forEach((time, i) => {
  let wins = 0
  for(t=0; t <= time; t++) {
    if (t*(time-t) > distances[i]) wins++
  }
  results *= wins
})

console.log(results)

console.timeEnd("time")