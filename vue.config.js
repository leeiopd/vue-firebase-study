
const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            // @ 를 이용한 별칭사용
            alias: {
                '@': path.join(__dirname, 'src/')
            }
        }
    }
}