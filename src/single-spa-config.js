import { registerApplication, start } from 'single-spa'
import axios from 'axios'

/*
* getManifest：远程加载manifest.json 文件，解析需要加载的js
* url: manifest.json 链接
* bundle：entry名称
* */
const getManifest = (url, bundle) => new Promise(async (resolve) => {
  const { data } = await axios.get(url)
  const { entrypoints, publicPath } = data
  const assets = entrypoints[bundle].assets
  const promiseArr = []
  for (let i = 0; i < assets.length; i++) {
    promiseArr[i] = await runScript(publicPath + assets[i])
    await runScript(publicPath + assets[i]).then(() => {
      if (i === assets.length - 1) {
        resolve()
      }
    })
  }
})

// 远程加载script
const runScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  })
}

registerApplication( // 注册微前端服务
  'demo',
  async () => {
    // 注册用函数，
    // return 一个singleSpa 模块对象，模块对象来自于要加载的js导出
    // 如果这个函数不需要在线引入，只需要本地引入一块加载：
    // () => import('xxx/main.js')
    await runScript('http://localhost:4003/app.js')
    console.log(window.demo)
    return window.demo
  },
  location => location.pathname.startsWith('/demo') // 加载条件
  // { authToken: 'd83jD63UdZ6RS6f70D0' } // 主项目参数，可传入到子项目
)

registerApplication( // 注册微前端服务
  '1',
  async () => {
    // 注册用函数，
    // return 一个singleSpa 模块对象，模块对象来自于要加载的js导出
    // 如果这个函数不需要在线引入，只需要本地引入一块加载：
    // () => import('xxx/main.js')
    // await runScript('http://localhost:4000/chunk-vendors.js')
    // await runScript('http://localhost:4000/app.js')

    // return window.subVue

    // 自动加载 跨域

    await getManifest('http://127.0.0.1:4000/manifest.json', 'app')
    console.log(window.subVue)
    return window.subVue
  },
  location => location.pathname.startsWith('/vue'), // 加载条件
  { authToken: 'd83jD63UdZ6RS6f70D0' } // 主项目参数，可传入到子项目
)

registerApplication( // 注册微前端服务
  'reactApp',
  async () => {
    // let reactApp = null
    // await getManifest('http://127.0.0.1:4001/manifest.json', 'main').then(() => {
    //   reactApp = window.reactApp
    // })
    // return reactApp
    await runScript('http://localhost:4001/static/js/runtime-main.js')
    await runScript('http://localhost:4001/static/js/2.chunk.js')
    await runScript('http://localhost:4001/static/js/main.chunk.js')
    console.log(window.reactApp)
    return window.reactApp
  },
  location => location.pathname.startsWith('/react'), // 加载条件
  { authToken: 'd83jD63UdZ6RS6f70D0' } // 主项目参数，可传入到子项目
)

registerApplication( // 注册微前端服务
  'angularApp',
  async () => {
    await runScript('http://localhost:4002/runtime-es2015.js')
    await runScript('http://localhost:4002/polyfills-es5.js')
    await runScript('http://localhost:4002/styles-es2015.js')
    await runScript('http://localhost:4002/vendor-es2015.js')
    await runScript('http://localhost:4002/main-es2015.js')
    console.log(window.subAngular)
    return window.subAngular
  },
  location => location.pathname.startsWith('/angular'), // 加载条件
  { authToken: 'd83jD63UdZ6RS6f70D0' } // 主项目参数，可传入到子项目
)

start()
