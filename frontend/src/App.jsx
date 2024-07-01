import AddUser from "./AddUser"
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AddUser />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
