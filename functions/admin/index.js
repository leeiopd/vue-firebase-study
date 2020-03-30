const app = require('express')()
const cors = require('cors')
const admin = require('firebase-admin')
require('express-async-errors')

const db = admin.firestore()

app.use(cors({ origin: true }))

app.use(require('../middlewares/verifyToken'))

// ~/admin 접근 시, 사용자 level Check
app.use((req, res, next) => {
    // user 권환 확인
    if (req.claims.level === undefined) {
        return res.status(403).send({ message: 'not authorized' })
    }
    // user level 확인
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

    s.forEach(element => {
        r.items.push(element.data())
    });

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

app.patch('/user/:uid/level', async (req, res) => {
    if (!req.params.uid) return this.res.status(400).end()
    if (req.body.level === undefined) return this.res.status(400).end()
    const uid = req.params.uid
    const level = req.body.level

    const claims = { level }
    // 유저에 대한 custom 정보 입력
    await admin.auth().setCustomUserClaims(uid, claims)
    await db.collection('users').doc(uid).update({ claims }).then(() => {
        console.log("업데이트 성공")
    })

    res.status(200).end()
})


app.use(require('../middlewares/error'));


module.exports = app