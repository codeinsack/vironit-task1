function randomInteger (min, max) {
  var rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}
module.exports.randomInteger = randomInteger
