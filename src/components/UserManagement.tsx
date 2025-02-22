import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  email: string;
  password: string;
  role: "admin" | "viewer";
  fullName: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    // Only set initial admin user if no users exist in localStorage
    const initialUsers = [
      {
        id: "admin1",
        email: "admin",
        password: "Admin@1209",
        role: "admin" as const,
        fullName: "Administrator"
      }
    ];
    localStorage.setItem("users", JSON.stringify(initialUsers));
    return initialUsers;
  });
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "viewer">("viewer");
  const [newFullName, setNewFullName] = useState("");
  const { toast } = useToast();

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!newFullName.trim()) {
      toast({
        title: "Invalid name",
        description: "Full name is required.",
        variant: "destructive",
      });
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: newEmail,
      password: newPassword,
      role: newRole,
      fullName: newFullName,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setNewEmail("");
    setNewPassword("");
    setNewFullName("");
    
    toast({
      title: "User added",
      description: "New user has been added successfully.",
    });
  };

  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddUser} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Add New User</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={newRole}
              onValueChange={(value: "admin" | "viewer") => setNewRole(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add User</Button>
        </div>
      </form>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{user.fullName}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">Role: {user.role}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};