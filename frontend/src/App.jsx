import { Routes, Route } from 'react-router-dom'

import AdminAuth from './pages/Admin/AdminAuth'
import ForgotPassword from './pages/Admin/ForgotPassword'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminSettings from './pages/Admin/AdminSettings'
import AddUser from './pages/Admin/AddUser'

const App = () => {

  return (
    <Routes>
      <Route path='/admin' element={<AdminAuth />} />
      <Route path='/admin/forgot-password' element={<ForgotPassword />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/settings' element={<AdminSettings />} />
      <Route path='/admin/add-user' element={<AddUser />} />
    </Routes>
  )
}

export default App