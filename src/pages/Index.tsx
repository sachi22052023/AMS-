import { TaskList } from "@/components/TaskList";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImportantLinks } from "@/components/ImportantLinks";
import { UserManagement } from "@/components/UserManagement";
import { format } from "date-fns";

const Index = () => {
  const { isLoggedIn, logout, isAdmin, userFullName } = useAuth();

  const currentTime = format(new Date(), "HH:mm 'IST'");

  return (
    <div className="min-h-screen bg-[#1E2A45]"> {/* Lightened background color */}
      {isLoggedIn ? (
        <>
          <div className="bg-white/10 backdrop-blur-md p-4 shadow-md mb-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">
                Oracle AMS
              </h1>
              <span className="text-gray-300">{currentTime}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Welcome, {userFullName?.toUpperCase()}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="container mx-auto px-4">
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="bg-white/5">
                <TabsTrigger value="tasks" className="text-white">Tasks</TabsTrigger>
                <TabsTrigger value="important-links" className="text-white">Important Links</TabsTrigger>
                {isAdmin && <TabsTrigger value="user-management" className="text-white">User Management</TabsTrigger>}
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
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Index;