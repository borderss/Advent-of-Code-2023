const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\n')

let idSum = 0

console.time("time")

data.forEach((game) => {
  const id = game.split(": ")[0].split(" ")[1]

  let maxRed = 0
  let maxGreen = 0
  let maxBlue = 0

  game.split(": ")[1].split("; ").forEach((v) => {
    v.split(", ").forEach((s)=>{
      if (s.includes("red") && parseInt(s) > maxRed) maxRed = parseInt(s) 
      if (s.includes("green") && parseInt(s) > maxGreen) maxGreen = parseInt(s) 
      if (s.includes("blue") && parseInt(s) > maxBlue) maxBlue = parseInt(s) 
    })
  })


  if (maxRed <= 12 && maxGreen <= 13 && maxBlue <= 14) {
    idSum += parseInt(id)
  }
})

console.timeEnd("time")

console.log(idSum)