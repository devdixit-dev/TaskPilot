
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckSquare, Users, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ManagerDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "My Team",
      value: "8",
      description: "Direct reports",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Tasks",
      value: "23",
      description: "Tasks assigned by me",
      icon: Calendar,
      color: "text-warning",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Completed Today",
      value: "12",
      description: "Tasks finished today",
      icon: CheckSquare,
      color: "text-success",
      bgColor: "bg-green-50"
    }
  ];

  const myTeam = [
    { name: "Alice Johnson", role: "Senior Developer", tasksCompleted: 5, tasksActive: 3 },
    { name: "Bob Smith", role: "UI/UX Designer", tasksCompleted: 3, tasksActive: 2 },
    { name: "Carol Davis", role: "Frontend Developer", tasksCompleted: 4, tasksActive: 1 },
    { name: "David Wilson", role: "Backend Developer", tasksCompleted: 6, tasksActive: 4 },
  ];

  const todaysTasks = [
    { title: "Review code submissions", assignee: "Alice Johnson", status: "completed" },
    { title: "Design homepage mockup", assignee: "Bob Smith", status: "in-progress" },
    { title: "Database optimization", assignee: "David Wilson", status: "pending" },
    { title: "User testing session", assignee: "Carol Davis", status: "completed" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Manager Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your team and track progress, {user?.name}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-light">
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Team Performance</CardTitle>
              <CardDescription>Your team members and their task completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTeam.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-primary">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-success">{member.tasksCompleted} completed</p>
                      <p className="text-xs text-muted-foreground">{member.tasksActive} active</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Today's Tasks</CardTitle>
              <CardDescription>Tasks scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Assigned to: {task.assignee}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : task.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {task.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
