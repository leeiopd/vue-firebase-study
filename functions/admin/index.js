const app = require('express')()
const cors = require('cors')
const admin = require('firebase-admin')
require('express-async-errors')

const db = admin.firestore()

app.use(cors({ origin: true }))

app.use(require('../middlewares/verifyToken'))

// ~/admin 접근 시, 사용자 level Check
app.use((req, res, next) => {
    if (req.claims.level > 0) {
        // admin 권한이 없다면
        return res.status(403).send({ message: 'not authorized' })
    }
    next()
})


app.get('/users', async (req, res) => {
    // 관리자 권한 확인
    if (req.claims.level > 0) {
        // 관리자 레벨이 아닐때, 에러 전송
        return res.status(403).send({ message: 'not authorized' })
    }

    // 요청받은 query에 대한 각각의 객체 생성
    let { offset, limit, order, sort, search } = req.query

    // offset/limit를 Number 객체로 변환
    offset = Number(offset)
    limit = Number(limit)

    const r = {
        items: [],
        totalCount: 0
    }

    let s = null

    // query에 검색어가 존재 유무 확인
    if (search) {
        // 검색어가 존재 한다면, 
        s = await db.collection('users').where('email', '==', search).get()
        r.totalCount = s.size
    } else {
        // 검색어가 존재하지 않으면
        const t = await db.collection('infos').doc('users').get()
        r.totalCount = t.data().counter

        // user Collection을 정렬하여 갯수대로 뿌려줌
        s = await db.collection('users').orderBy(order, sort).offset(offset).limit(limit).get()

    }

    s.forEach(element => r.items.push(element.data()));

    // send -> 프론트로 정보 전송
    res.send(r)
})


// 검색창 filter 기능
app.get('/search', async (req, res) => {
    let s = null;

    // 검색어 존재 유무 확인
    if (req.query.search === undefined) {
        // 존재하지 않을 때, 전체 목록 요청
        s = await db.collection('users').get()
    } else {
        // 존재 할 때, 검색어를 이용하여 관련 내용 listup
        s = await db.collection('users').where('email', '>=', req.query.search).get()
    }

    const items = []

    // 받아온 데이터를 items에 하나씩 push
    s.forEach(v => {
        items.push(v.data().email)
    })

    // 전송
    res.send(items)
})


app.use(require('../middlewares/error'));


module.exports = app