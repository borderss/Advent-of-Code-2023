const fs = require('fs')
const data = fs.readFileSync(__dirname + '/input.txt', "utf-8").split('\r\n')

console.time("time")

const seeds = data[0].split(": ")[1].split(" ")

const mappings = [];
let isNewMapping = false;

for (let line of data.slice(1)) {
  if (!line.trim()) { isNewMapping = true; continue }
  if (isNewMapping) {
    mappings.push([]);
    isNewMapping = false;
  } else {
    const [dest, source, range] = line.split(' ').map(Number);
    mappings[mappings.length - 1].push([source, dest, range]);
  }
}

for (const mapping of mappings) {
  mapping.sort((a, b) => a[0] - b[0])
}

let ranges = []

let from = null
for (let i = 0; i < seeds.length; i++) {
  if (i % 2 === 0) {
    from = +seeds[i]
  } else {
    ranges.push([from, from + +seeds[i] - 1])
  }
}

ranges.sort((a, b) => a[0] - b[0])

for (let i = 0; i < mappings.length; i++) {
  let nthMap = 0
  let newRanges = []

  let range = null;
  while (ranges.length || range) {
    if (!range) range = ranges.shift()

    const range0 = range[0]
    const range1 = range[1]

    if (nthMap >= mappings[i].length) {
      newRanges.push([range0, range1])
      range = null
      continue
    }

    const start = mappings[i][nthMap][0]
    const end = mappings[i][nthMap][0] + mappings[i][nthMap][2] - 1
    const offset = mappings[i][nthMap][1] - mappings[i][nthMap][0]

    if (range0 < start && range1 < start) {
      newRanges.push([range0, range1])
      range = null
    } else if (range0 >= start && range1 <= end) {
      newRanges.push([range0 + offset, range1 + offset])
      range = null
    } else if (range0 <= start && range1 <= end) {
      if (range0 < start) newRanges.push([range0, start - 1])
      newRanges.push([start + offset, range1 + offset])
      range = null
    } else if (range0 <= start && range1 >= end) {
      if (range0 < start) newRanges.push([range0, start - 1])
      newRanges.push([start + offset, end + offset]);
      if (range1 > end) ranges.unshift([end + 1, range1])
      range = null;
    } else if (range0 <= end && range1 > end) {
      newRanges.push([range0 + offset, end + offset])
      ranges.unshift([end + 1, range1])
      range = null;
    } else {
      nthMap += 1;
    }
  }

  ranges = newRanges
  ranges.sort((a, b) => a[0] - b[0])
}

const loc = Math.min(...ranges.map(range => range[0]))

console.timeEnd("time")

console.log(loc)