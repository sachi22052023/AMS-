import { TaskList } from "@/components/TaskList";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImportantLinks } from "@/components/ImportantLinks";
import { UserManagement } from "@/components/UserManagement";

const Index = () => {
  const { isLoggedIn, logout, isAdmin, userFullName } = useAuth();

  return (
    <div className="min-h-screen bg-sky-100">
      <div className="bg-white p-4 shadow-md mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Oracle AMS
        </h1>
        {isLoggedIn && (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {userFullName?.toUpperCase()}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="container mx-auto px-4">
        {!isLoggedIn ? (
          <LoginForm />
        ) : (
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="important-links">Important Links</TabsTrigger>
              {isAdmin && <TabsTrigger value="user-management">User Management</TabsTrigger>}
            </TabsList>
            <TabsContent value="tasks">
              <TaskList />
            </TabsContent>
            <TabsContent value="important-links">
              <ImportantLinks />
            </TabsContent>
            {isAdmin && (
              <TabsContent value="user-management">
                <UserManagement />
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Index;