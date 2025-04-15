import Auth from "./pages/Auth"
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Edit from "./pages/Edit"
import Chats from "./pages/Chats"


function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
          <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/edit-image" element={<Edit />} />
          </Routes>
    </>
  )
}

export default App
