# 微应用整合

```
基座应用 React -> 4-micro-app   需安装 qiankun
子应用
	   React -> 5-micro-app1  需安装 qiankun
	   React -> 6-micro-app2   需安装 qiankun
	   Vue3   -> 7-micro-app-vue3  无需安装 qiankun


```

## 基座应用配置  

1. 在`index.js` 文件中配置`qiankun`

   ```js
   // qiankun 配置
   registerMicroApps([
     {
       name: "reactApp1", // 每一个子应用的名字  React应用的名字不重要
       entry: "//localhost:8081",  // 子应用的端口 必须一致
       container: "#reactApp1",  // 子应用在父应用的挂载点
       activeRule: "/reactApp1" // 父应用中激活子应用的规则
     },
     {
       name: "reactApp2",
       entry: "//localhost:8082",
       container: "#reactApp2",
       activeRule: "/reactApp2"
     },
     {
       name: "vueApp3",
       entry: "//localhost:8083",
       container: "#vueApp3",
       activeRule: "/vueApp3"
     }
   ])
   // 启动 父应用
   start()
   
   ```

2. 在`src/` 新建一个 `public-path.js`文件，以防`React `子应用报错，`Vue`后面单独配置

   ```js
   if (window.__POWERED_BY_QIANKUN__) {
     __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
   }
   ```

3. 在`App.jsx` 文件中设置子应用的挂载点

   ```jsx
   function Index(){
   	return (
   		<div id="App">  // 这里的名字不能够和Vue React 独立项目中的挂载点重合 也不能和 子应用的挂载点重合
   		  <div id="reactApp1"></div>
             <div id="reactApp2"></div>
             <div id="vueApp3"></div>
           </div>
   	)
   }
   ```

4. `npm install react-app-rewired` , 也可以使用 `npm eject` ，这里使用前者。在父应用根目录下新建文件`config-overrides.js` 

   ```js
   const { name } = require("./package")
   module.exports = {
     webpack: (config) => {
       config.output.library = `${name}-[name]`
       config.output.libraryTarget = "umd"
       config.output.chunkLoadingGlobal = `webpackJsonp_${name}`
       config.output.globalObject = "window"
   
       return config
     },
   
     devServer: (_) => {
       const config = _
       config.headers = {  // 允许跨域
         "Access-Control-Allow-Origin": "*"
       }
       config.historyApiFallback = true
       config.hot = false
       config.watchContentBase = false
       config.liveReload = false
       config.port = 8080
       return config
     }
   }
   ```

   

## React  微应用配置

1. `npm install qiankun -S`   `npm install react-app-rewired -D`

2. 在 `src/` 下新建 `public-path.js ` 内容和基座应用一致

3. 在项目根目录下新建`config-overrides.js` 内容和基座应用一致

4. 在项目的`index.js` 文件中的第一行引入`public-path.js `

5. 配置导出生命周期  `index.js`

   ```js
   const render = (props) => {
     const { container } = props
     // 限制子应用的挂载范围
     newContainer = container
       ? container.querySelector("#root")
       : document.querySelector("#root")
     root = ReactDOMClient.createRoot(newContainer)
     root.render(
     	// 子应用路由的配置 
       // <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? "/reactApp" : "/"}>
       <React.StrictMode>
         <App />
       </React.StrictMode>
     )
   }
   
   if (!window.__POWERED_BY_QIANKUN__) {  // 项目独立运行时
     render({})
   }
   
   export async function bootstrap() {
     console.log("[react16] react app bootstraped")
   }
   
   export async function mount(props) {
     console.log("[react16] props from main framework", props)
     render(props)
   }
   
   export async function unmount(props) {
     const { container } = props
     root.unmount(
       container
         ? container.querySelector("#reactApp1")
         : document.querySelector("#reactApp1")
     )
   }
   
   ```



## Vue 微应用配置

- <font style="color:red">这里使用的Vue 3 ， Vue2 请自行探索</font>

1. 在`src/` 新建  `public-path.js ` 文件  内容和基座一致

2. 在 `main.js` 首行引入 `public-path.js`

3. 在`main.js`中导出生命周期

   ```js
   
   let app = createApp(App)
   function render(props = {}) {
     const { container } = props
     app.mount(container ? container.querySelector("#vueApp3") : "#app")
   }
   if (!window.POWERED_BY_QIANKUN__) {
     render()
   }
   export async function bootstrap() {
     console.log("[vue] vue app bootstraped")
   }
   export async function mount(props) {
     console.log("[vue] props from main framework", props)
     render(props)
   }
   export async function unmount() {
     app.unmount()
   }
   ```

4. 在项目根目录新建`vue.config.js`
   <font style="color:red">注意：package.json 中的name 必须时基座应用中配置的 name 属性一致， 比如上面配置的 vueApp3， 那么在 Vue3 项目的中的package.json 文件中name属性必须一致 </font>

   ```JS
   const APP_NAME = require("./package.json").name  // 这里的pacage.json 中的name 属性就是 vueApp3
   const path = require("path")
   module.exports = {
     devServer: {
       // 监听端口
       port: 8083,
       // 关闭主机检查，使微应用可以被 fetch
       disableHostCheck: true,
       // 配置跨域请求头，解决开发环境的跨域问题
       headers: {
         "Access-Control-Allow-Origin": "*"
       }
     },
     configureWebpack: {
       resolve: {
         alias: {
           "@": path.resolve(__dirname, "src")
         }
       },
       output: {
         // 微应用的包名，这里与主应用中注册的微应用名称一致
         library: APP_NAME,
         // 将你的 library 暴露为所有的模块定义下都可运行的方式
         libraryTarget: "umd",
         // 按需加载相关，设置为 webpackJsonp_微应用名称 即可
         jsonpFunction: `webpackJsonp_${APP_NAME}`
       }
     }
   }
   ```



## 结语

- 这只是一个对微前端的基本配置，更多的东西这里并没有， 以后会持续更新