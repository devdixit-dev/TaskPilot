import { useNavigate } from 'react-router-dom'

const AdminOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="border-2 rounded-md border-[#242424] px-8 py-10">
      <h3 className="text-2xl">Admin options</h3>
      <div className="flex gap-16 mt-6">
        <button onClick={() => navigate('/admin/add-user')} className="py-2 px-6 rounded-md bg-blue-500 cursor-pointer transition-all duration-300 hover:opacity-80">Add User</button>
        <button onClick={() => navigate('/admin/add-user')} className="py-2 px-6 rounded-md bg-orange-500 cursor-pointer transition-all duration-300 hover:opacity-80">Promote User</button>
        <button onClick={() => navigate('/admin/add-user')} className="py-2 px-6 rounded-md bg-red-500 cursor-pointer transition-all duration-300 hover:opacity-80">Remove User</button>
        <button onClick={() => navigate('/admin/add-user')} className="py-2 px-6 rounded-md bg-green-800 cursor-pointer transition-all duration-300 hover:opacity-80">All Users</button>
        <button onClick={() => navigate('/admin/add-user')} className="py-2 px-6 rounded-md bg-purple-500 cursor-pointer transition-all duration-300 hover:opacity-80">Unverified Users</button>
      </div>
    </div>
  )
}

export default AdminOptions