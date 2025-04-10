import Auth from "./pages/Auth"
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Edit from "./pages/Edit"


function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
          <Routes>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/edit-image" element={<Edit />} />
          </Routes>
    </>
  )
}

export default App
