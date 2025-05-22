import AdminOptions from "../../components/AdminOptions"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import TaskOptions from "../../components/TaskOptions"

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div>
          <AdminOptions />
          <TaskOptions />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard