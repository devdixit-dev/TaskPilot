import { Routes, Route } from 'react-router-dom'
import AdminAuth from './pages/AdminAuth'

const App = () => {

  return (
    <Routes>
      <Route path='/admin' element={<AdminAuth />} />
    </Routes>
  )
}

export default App