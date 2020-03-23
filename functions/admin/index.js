const app = require('express')()
const cors = require('cors')
const admin = require('firebase-admin')
require('express-async-errors')

const db = admin.firestore()

app.use(cors({ origin: true }))

app.use(require('../middlewares/verifyToken'))


app.get('/users', async (req, res) => {
    // 관리자 권한 확인
    if (req.claims.level > 0) {
        return res.status(403).send({ message: 'not authorized' })
    }
    let { offset, limit, order, sort } = req.query
    offset = Number(offset)
    limit = Number(limit)

    const r = {
        items: [],
        totalCount: 0
    }

    const t = await db.collection('infos').doc('users').get()
    r.totalCount = t.data().counter

    // user Collection을 정렬하여 갯수대로 뿌려줌
    const s = await db.collection('users').orderBy(order, sort).offset(offset).limit(limit).get()
    console.log(r)


    s.forEach(element => r.items.push(element.data()));

    // send -> 프론트로 정보 전송
    res.send(r)
})


app.use(require('../middlewares/error'));


module.exports = app