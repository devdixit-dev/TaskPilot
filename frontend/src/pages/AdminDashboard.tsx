
import { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, CheckSquare, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AddUserDialog } from '@/components/AddUserDialog';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  const stats = [
    {
      title: "Total Employees",
      value: "24",
      description: "Active team members",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Tasks",
      value: "156",
      description: "Tasks in progress",
      icon: Calendar,
      color: "text-warning",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Completed Today",
      value: "32",
      description: "Tasks finished today",
      icon: CheckSquare,
      color: "text-success",
      bgColor: "bg-green-50"
    },
    {
      title: "Productivity",
      value: "87%",
      description: "Overall completion rate",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const recentActivities = [
    { user: "Sarah Manager", action: "assigned task to Mike Employee", time: "2 hours ago" },
    { user: "Mike Employee", action: "completed task: Update website header", time: "3 hours ago" },
    { user: "John Admin", action: "added new employee: Lisa Wilson", time: "5 hours ago" },
    { user: "Sarah Manager", action: "created new project: Mobile App", time: "1 day ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name}! Here's what's happening at {user?.companyName || 'your company'}.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Recent Activities</CardTitle>
              <CardDescription>Latest actions across your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-accent rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-primary">{activity.user}</span>{' '}
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => setIsAddUserDialogOpen(true)}
                >
                  <Users className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-medium text-sm">Add Employee</h3>
                  <p className="text-xs text-muted-foreground">Create new user account</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <Calendar className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-medium text-sm">Create Task</h3>
                  <p className="text-xs text-muted-foreground">Assign new task</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <CheckSquare className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-medium text-sm">View Reports</h3>
                  <p className="text-xs text-muted-foreground">Performance analytics</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <TrendingUp className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-medium text-sm">Team Analytics</h3>
                  <p className="text-xs text-muted-foreground">Productivity insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddUserDialog 
        isOpen={isAddUserDialogOpen} 
        onClose={() => setIsAddUserDialogOpen(false)} 
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;
