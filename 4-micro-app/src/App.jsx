import logo from "./logo.svg"
import { useNavigate } from "react-router-dom"
import "./App.css"

function App() {
  const navigate = useNavigate()
  function toApp1() {
    navigate("/reactapp1")
  }
  function toApp2() {
    navigate("/reactApp2")
  }
  function toApp3() {
    navigate("/vueApp3")
  }
  return (
    <div className="App">
      <h1>Micro React 应用</h1>
      <button onClick={toApp1}>React App 1</button>
      <button onClick={toApp2}>React App 2</button>
      <button onClick={toApp3}>Vue App 3</button>
      <div id="reactApp1"></div>
      <div id="reactApp2"></div>
      <div id="vueApp3"></div>
    </div>
  )
}

export default App
