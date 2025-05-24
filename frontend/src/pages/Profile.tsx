
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { ProfileManagement } from '@/components/ProfileManagement';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences, {user?.name}
          </p>
        </div>

        <ProfileManagement />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
