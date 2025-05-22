import { Routes, Route } from 'react-router-dom'

import AdminAuth from './pages/Admin/AdminAuth'
import ForgotPassword from './pages/Admin/ForgotPassword'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminSettings from './pages/Admin/AdminSettings'

const App = () => {

  return (
    <Routes>
      <Route path='/admin' element={<AdminAuth />} />
      <Route path='/admin/forgot-password' element={<ForgotPassword />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/settings' element={<AdminSettings />} />
    </Routes>
  )
}

export default App