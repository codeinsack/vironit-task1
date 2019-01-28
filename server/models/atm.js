var fs = require('fs')
var path = require('path')

var p = path.join(path.dirname(process.mainModule.filename), 'data', 'atm.json')

var getAtmsFromFile = function (callback) {
  fs.readFile(p, function (err, fileContent) {
    if (err) {
      console.log(err)
    } else {
      callback(JSON.parse(fileContent))
    }
  })
}

function Atm (id, count, visits) {
  this.id = id
  this.count = count
  this.visits = visits
}

// странно, что addAtm не статичный, а остальные статичные методы
Atm.prototype.addAtm = function () {
  var newAtm = this
  getAtmsFromFile(function (atms) {
    var updatedAtms = atms.slice()
    updatedAtms.push(newAtm)
    fs.writeFile(p, JSON.stringify(updatedAtms), function (err) {
      console.log(err)
    })
  })
}

Atm.deleteAtm = function (id) {
  getAtmsFromFile(atms => {
    var updatedAtms = atms.filter(atm => atm.id !== id)
    fs.writeFile(p, JSON.stringify(updatedAtms), err => {
      console.log(err)
    })
  })
}

Atm.updateAtm = function (id, count, visits) {
  getAtmsFromFile(atms => {
    var updatedAtms = atms.map(function (atm) {
      if (atm.id === id) {
        atm.count = count
        atm.visits = visits
      }
      return atm
    })
    fs.writeFile(p, JSON.stringify(updatedAtms), err => {
      if (err) console.log(err)
    })
  })
}

Atm.fetchAll = function (callback) {
  getAtmsFromFile(callback)
}

module.exports = Atm
