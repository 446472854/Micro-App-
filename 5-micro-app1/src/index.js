import "./public-path"
import React from "react"
import * as ReactDOMClient from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
var newContainer
var root

const render = (props) => {
  const { container } = props
  newContainer = container
    ? container.querySelector("#root")
    : document.querySelector("#root")
  root = ReactDOMClient.createRoot(newContainer)
  root.render(
    // <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? "/reactApp" : "/"}>
    //   <React.StrictMode>
    //     <App />
    //   </React.StrictMode>
    // </BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
if (!window.__POWERED_BY_QIANKUN__) {
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
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
