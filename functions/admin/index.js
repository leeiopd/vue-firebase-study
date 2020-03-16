const app = require('express')()
const cors = require('cors')
require('express-async-errors')

app.use(cors({ origin: true }))

app.use(require('../middlewares/verifyToken'))


app.get('/users', (req, res) => {
    // 관리자 권한 확인
    if (req.claims.level > 0) {
        return res.status(403).send({ message: 'not authorized' })
    }
    // send -> 프론트로 정보 전송
    res.send(req.claims)
})


app.use(require('../middlewares/error'));


module.exports = app