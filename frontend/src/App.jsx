import { Routes, Route } from 'react-router-dom'
import AdminAuth from './pages/Admin/AdminAuth'
import ForgotPassword from './pages/Admin/ForgotPassword'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<AdminAuth />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>
  )
}

export default App