const functions = require('firebase-functions')
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp()

const db = admin.firestore()

console.log(functions.config().admin.email)

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.test = functions.https.onRequest(require("./test"))
exports.admin = functions.https.onRequest(require("./admin"))
// 사용자 생성 시 함수 트리거
exports.createUser = functions.auth.user().onCreate(async (user) => {
    const { uid, email, displayName, emailVerified, photoURL, disabled } = user
    const claims = { level: 2 }
    if (functions.config().admin.email === user.email && user.emailVerified) claims.level = 0

    // 유저에 대한 custom 정보 입력
    await admin.auth().setCustomUserClaims(uid, claims)

    const d = {
        uid, email, displayName, emailVerified, photoURL, disabled
    }

    // uid key 값에 저장 하므로 create가 아닌 set
    const r = await db.collection("users").doc(uid).set(d)

    return r
})

exports.deleteUser = functions.auth.user().onDelete((user) => {
    return db.collection("users").doc(user.uid).delete()
})


// firebase functions 환경구성
// admin 설정
// $ firebase functions:config:set admin.email={email 주소}

// gcp를 이용하기 때문에 파일을 생성해주어야 함
// firebase functions:config:get > .runtimeconfig.json
// .funtimeconfig.json 파일에 환경 구성 설정을 파일로 저장해 두어야함