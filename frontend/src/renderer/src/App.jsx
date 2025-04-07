import AuthPage from "./pages/AuthPage"
import { Route, Routes } from 'react-router-dom'


function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
          <Routes>
          <Route path='/'  element={<AuthPage/>}/>
          </Routes>
    </>
  )
}

export default App
