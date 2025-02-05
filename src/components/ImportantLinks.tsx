import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Link {
  id: string;
  title: string;
  fileUrl: string;
  comment: string;
}

export const ImportantLinks = () => {
  const [links, setLinks] = useState<Link[]>(() => {
    const savedLinks = localStorage.getItem("important-links");
    return savedLinks ? JSON.parse(savedLinks) : [];
  });
  const [comment, setComment] = useState("");
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    
    const newLink: Link = {
      id: Math.random().toString(36).substr(2, 9),
      title: file.name,
      fileUrl,
      comment,
    };

    const updatedLinks = [newLink, ...links];
    setLinks(updatedLinks);
    localStorage.setItem("important-links", JSON.stringify(updatedLinks));
    setComment("");
    
    toast({
      title: "Link added",
      description: "Your new link has been added successfully.",
    });
  };

  const deleteLink = (id: string) => {
    if (!isAdmin) return;
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
    localStorage.setItem("important-links", JSON.stringify(updatedLinks));
    
    toast({
      title: "Link deleted",
      description: "The link has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Add New Link</h3>
          <div className="space-y-4">
            <Input
              type="file"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
            <Textarea
              placeholder="Add a comment about this link..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div className="space-y-2">
              <a
                href={link.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {link.title}
              </a>
              {link.comment && (
                <p className="text-gray-600 text-sm">{link.comment}</p>
              )}
            </div>
            {isAdmin && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteLink(link.id)}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};