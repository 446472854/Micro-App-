import React from "react"
import "./index.css"
import * as ReactDOMClient from "react-dom/client"
import App from "./App"
import { registerMicroApps, start } from "qiankun"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
// qiankun 配置
registerMicroApps([
  {
    name: "reactApp1",
    entry: "//localhost:8081",
    container: "#reactApp1",
    activeRule: "/reactApp1"
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
start()
var newContainer
var root
newContainer = document.querySelector("#root")
root = ReactDOMClient.createRoot(newContainer)
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
