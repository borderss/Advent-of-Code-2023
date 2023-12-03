const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\n')

let sum = 0

console.time("time")

data.forEach((v)=>{
  let firstNum = null
  let currentNum = null

  for (let i = 0; i < v.length; i++) {
    const c = v[i]
    if (parseInt(c) != c) continue
    if (!firstNum) firstNum = c
    currentNum = c
  }
  sum += +firstNum*10 + +currentNum
})

console.timeEnd("time")

console.log(sum)