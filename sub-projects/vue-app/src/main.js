import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

// new Vue({ // dev时需要打开，打包可丢掉
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

const vueOptions = { // 挂载配置
  el: '#subVue', // 配置的html中的Id
  router,
  store,
  render: h => h(App)
}

// 判断当前页面使用singleSpa应用,不是就渲染
if (!window.singleSpaNavigate) {
  delete vueOptions.el
  new Vue(vueOptions).$mount('#app')
}

// singleSpaVue包装一个vue微前端服务对象
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions
})
export const bootstrap = vueLifecycles.bootstrap // 启动时
export const mount = vueLifecycles.mount // 挂载时
export const unmount = vueLifecycles.unmount // 卸载时

export default vueLifecycles

// export function bootstrap (props) {
//   return Promise
//     .resolve()
//     .then(() => {
//       // One-time initialization code goes here
//       // alert(JSON.stringify(props))
//       // console.log('bootstrapped!')
//       // console.log(props.authToken)
//     })
// }

// export function mount (props) {
//   return Promise
//     .resolve()
//     .then(() => {
//       // One-time initialization code goes here
//       // console.log('mounted!')
//       // console.log(props.authToken)
//     })
// }

// export function unmount (props) {
//   return Promise
//     .resolve()
//     .then(() => {
//       // One-time initialization code goes here
//       // console.log('unmountted!')
//       // console.log(props.authToken)
//     })
// }
