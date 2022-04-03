import logo from "./logo.svg"
import { useState } from "react"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  function Add() {
    setCount(count + 1)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Micro App 2</h1>
        <div className="box">
          <h1>{count}</h1>
          <button onClick={Add}>增加</button>
        </div>
      </header>
    </div>
  )
}

export default App
