import Auth from "./pages/Auth"
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Edit from "./pages/Edit"


function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
          <Routes>
          <Route path='/'  element={<Home/>}/>
          </Routes>
    </>
  )
}

export default App
