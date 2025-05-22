import { Routes, Route } from 'react-router-dom'
import AdminAuth from './pages/Admin/AdminAuth'
import ForgotPassword from './pages/Admin/ForgotPassword'
import AdminDashboard from './pages/Admin/AdminDashboard'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<AdminAuth />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
    </Routes>
  )
}

export default App