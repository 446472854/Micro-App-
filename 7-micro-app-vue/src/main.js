import "./public-path"
import { createApp } from "vue"
import App from "./App.vue"

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
  app = null
}
