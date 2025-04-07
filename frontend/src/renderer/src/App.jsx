import Auth from "./pages/Auth"
import { Route, Routes } from 'react-router-dom'


function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
          <Routes>
          <Route path='/'  element={<Auth/>}/>
          </Routes>
    </>
  )
}

export default App
