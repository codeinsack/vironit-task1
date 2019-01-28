const uniqid = require('uniqid')
const utils = require('./utils')

const EventEmitter = require('./eventEmitter')

class Atm extends EventEmitter {
  constructor (id = uniqid(), count = 0, visits = []) {
    super()
    this.id = id
    this.count = count
    this.visits = visits
    this.isFree = true
  }

  makeBusy () {
    this.count++
    this.isFree = false
    this.startTime = new Date()
    this.emit('Atm_MakeBusy')
    setTimeout(() => {
      this.makeFree()
    }, utils.randomInteger(1000, 3000))
  }

  makeFree () {
    const parsedDate = this.formatDate(this.startTime)
    this.isFree = true
    this.visits.push({ date: parsedDate, duration: (new Date() - this.startTime) / 1000 })
    this.emit('Atm_MakeFree')
  }

  // метод не использует this, что он тогда вообще делает в классе?) самое место в utils
  formatDate (date) {
    const MONTHS = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ]
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return `${day} ${MONTHS[monthIndex]} ${year}, ${hours}:${minutes}:${seconds}`
  }
}

module.exports = Atm
