import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

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
    <div className="space-y-8 max-w-3xl mx-auto">
      {isAdmin && (
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Add New Link</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <Textarea
                placeholder="Add a comment about this link..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload File
              </label>
              <Input
                type="file"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
            </div>
          </div>
        </Card>
      )}
      
      <div className="space-y-4">
        {links.map((link) => (
          <Card
            key={link.id}
            className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex-1">
                {link.comment && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Comment</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{link.comment}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">File</h4>
                  <a
                    href={link.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium inline-flex items-center"
                  >
                    {link.title}
                  </a>
                </div>
              </div>
              {isAdmin && (
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteLink(link.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
        {links.length === 0 && (
          <p className="text-center text-gray-500">No links have been added yet.</p>
        )}
      </div>
    </div>
  );
};