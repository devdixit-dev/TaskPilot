
import { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Calendar as CalendarIcon, CheckSquare, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const TaskManagement = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete user authentication module',
      description: 'Implement login/logout functionality with JWT tokens',
      assignedTo: 'Mike Employee',
      assignedBy: 'Sarah Manager',
      priority: 'high',
      status: 'in-progress',
      dueDate: new Date(),
      createdAt: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      title: 'Update API documentation',
      description: 'Update documentation for new endpoints',
      assignedTo: 'Lisa Wilson',
      assignedBy: 'John Admin',
      priority: 'medium',
      status: 'pending',
      dueDate: new Date(Date.now() + 86400000),
      createdAt: new Date(Date.now() - 43200000)
    },
    {
      id: '3',
      title: 'Database optimization',
      description: 'Optimize database queries for better performance',
      assignedTo: 'Tom Developer',
      assignedBy: 'Sarah Manager',
      priority: 'low',
      status: 'completed',
      dueDate: new Date(Date.now() - 86400000),
      createdAt: new Date(Date.now() - 172800000)
    }
  ]);

  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: '',
    dueDate: undefined as Date | undefined
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const users = [
    'Mike Employee',
    'Lisa Wilson',
    'Tom Developer',
    'Sarah Manager'
  ];

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.assignedTo || !newTask.priority || !newTask.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const task = {
      id: Date.now().toString(),
      ...newTask,
      assignedBy: user?.name || 'Admin',
      status: 'pending',
      createdAt: new Date(),
      dueDate: newTask.dueDate!
    };

    setTasks(prev => [task, ...prev]);
    setNewTask({ title: '', description: '', assignedTo: '', priority: '', dueDate: undefined });
    setIsCreateTaskOpen(false);
    
    toast({
      title: "Success",
      description: `Task assigned to ${newTask.assignedTo}`,
    });
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus}`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTasks = selectedDate
    ? tasks.filter(task => 
        format(task.dueDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
    : tasks;

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length.toString(),
      description: "All tasks created",
      icon: CheckSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "In Progress",
      value: tasks.filter(t => t.status === 'in-progress').length.toString(),
      description: "Currently active",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Completed",
      value: tasks.filter(t => t.status === 'completed').length.toString(),
      description: "Successfully finished",
      icon: CheckSquare,
      color: "text-success",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Task Management</h1>
            <p className="text-muted-foreground mt-2">
              Create, assign, and track tasks across your team
            </p>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Filter by Date</CardTitle>
              <CardDescription>Select a date to view tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
              />
            </CardContent>
          </Card>

          {/* Tasks List */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-primary">
                {selectedDate ? `Tasks for ${format(selectedDate, "PPP")}` : 'All Tasks'}
              </CardTitle>
              <CardDescription>
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-primary mb-1">{task.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>Assigned to: {task.assignedTo}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-3 h-3" />
                            <span>Due: {format(task.dueDate, "MMM dd")}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                        
                        {task.status !== 'completed' && (
                          <Select onValueChange={(value) => handleStatusChange(task.id, value)}>
                            <SelectTrigger className="w-32 h-7">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredTasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No tasks found for the selected date</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskManagement;
