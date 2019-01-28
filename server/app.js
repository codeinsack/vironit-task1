var express = require('express')
var bodyParser = require('body-parser')

var Atm = require('./models/atm')

var app = express()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res, next) {
  Atm.fetchAll(function (atms) {
    res.send(atms)
  })
})

app.post('/', function (req, res) {
  // вообще айди нужно создавать на бэке, ане получать от фронта
  var atm = new Atm(req.body.id, req.body.count, req.body.visits)
  atm.addAtm()
  // тогда тут нужно было отправить созданный атм, который содержал бы айди
  res.send(req.body)
})

app.delete('/', function (req, res) {
  // а если такого атма нет?
  Atm.deleteAtm(req.body.id)
  res.send(req.body)
})

app.put('/', function (req, res) {
  // а если нет?
  Atm.updateAtm(req.body.id, req.body.count, req.body.visits)
  res.send(req.body)
})

app.listen(3000)
