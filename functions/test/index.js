const app = require('express')()
const cors = require('cors')
require('express-async-errors')
app.use(cors({ origin: true }))
app.use(cors())

app.use(require('../middlewares/verifyToken'))

app.post('/', async (req, res) => {
    res.send('post ok')
})

app.get('/', (req, res) => {
    res.send('read ok ' + req.params.id)
})

app.get('/:id', (req, res) => {
    res.send('read ok ' + req.params.id)
})

app.put('/:id', (req, res) => {
    res.send('put ok ' + req.params.id)
})

app.delete('/:id', (req, res) => {
    res.send('delete ok ' + req.params.id)
})

app.use(require('../middlewares/error'));


module.exports = app