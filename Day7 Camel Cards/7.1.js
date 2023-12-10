const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\r\n')

console.time("time")

const priorityArr = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

const rankedHands = []

data.forEach((line) => {
  const hand = line.split(" ")[0]
  const bet = +line.split(" ")[1]
  const sortedHand = hand.split("").sort((a, b) => {
    return priorityArr.indexOf(a) - priorityArr.indexOf(b)
  }).join("")
  const handSplit = sortedHand.match(/(.)\1*/g)
  const sortedHandSplit = handSplit.sort((a, b) => {
    return b.length - a.length
  })
  
  let priority = 0


  if (sortedHandSplit.length == 5) priority = 1
  if (sortedHandSplit.length == 4) priority = 2
  if (sortedHandSplit.length == 3) {
    if (sortedHandSplit[0].length == 2 && sortedHandSplit[1].length == 2 ) priority = 3
    else if (sortedHandSplit[0].length == 3) priority = 4
  }
  if (sortedHandSplit.length == 2) {
    if (sortedHandSplit[0].length == 3 && sortedHandSplit[1].length == 2) priority = 5
    else if (sortedHandSplit[0].length == 3) priority = 4
    else if (sortedHandSplit[0].length == 4) priority = 6
  }

  if (sortedHandSplit.length == 1) priority = 7
  

  rankedHands.push({
    hand: hand,
    bet: bet,
    priority: priority
  })
})

rankedHands.sort((a, b)=>{
  if (b.priority == a.priority) {
    for(i = 0; i <= 5; i++) {
      let indexA = priorityArr.indexOf(a.hand[i])
      let indexB = priorityArr.indexOf(b.hand[i])
      
      if (indexA != indexB) {
        if (indexA > indexB) return -1
        return 1
      }
    }
  }
  return a.priority - b.priority
})

let sum = 0
rankedHands.forEach((v, i) => {
  sum += v.bet * (i + 1)
})

console.log(sum)

console.timeEnd("time")