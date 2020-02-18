import Vue from 'vue'

// error Handler
Vue.config.errorHandler = e => {
    // console.log('here')
    // console.error(e.message)
    Vue.prototype.$toasted.global.error(e.message)
}