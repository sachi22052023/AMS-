import { TaskList } from "@/components/TaskList";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { Crown } from "lucide-react";

const Index = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3D]">
      {isLoggedIn ? (
        <>
          <div className="bg-[#2A2438] p-4 shadow-lg mb-8">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6 text-[#9b87f5]" />
                <h1 className="text-2xl font-bold text-white">
                  ORACLE LSGUI
                </h1>
              </div>
              <button
                onClick={logout}
                className="px-6 py-2 bg-[#9b87f5] text-white rounded-md hover:bg-[#8b77e5] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="container mx-auto px-4">
            <TaskList />
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Index;