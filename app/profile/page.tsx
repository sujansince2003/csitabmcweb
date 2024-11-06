"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import { CldUploadWidget } from "next-cloudinary";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  imageurl: string | null;
  imagepublicId: string | null;
  department: string | null;
  semester: string | null;
  bio: string | null;
  location: string | null;
  role: string;
}

interface CloudinaryResult {
  public_id: string;
  url: string;
}
const uploadPresetvalue =
  process.env.NEXT_PUBLIC_CLOUDINARY_AVATAR_UPLOAD_PRESET;

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    //checks if user is logged in or not.if not redirect to login page
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchUserProfile();
    }
  }, [status, router]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/update-profile");
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      setUserProfile(data.user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to load profile");
      setIsLoading(false);
    }
  };

  const handleEdit = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  function handleAvatarChange(url: string, public_id: string) {
    setUserProfile((prev) =>
      prev ? { ...prev, imageurl: url, imagepublicId: public_id } : null
    );
    setIsEditing((prev) => ({ ...prev, imageurl: true }));
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Saves the updated user profile to the server.
   * If the request is successful, clears the editing state and shows a success toast.
   * If the request fails, shows an error toast.
   */
  /******  363b5300-2e4d-40cb-9e01-417475d0a135  *******/
  const handleSave = async () => {
    try {
      const response = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setIsEditing({});
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userProfile) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="academic">Academic Information</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32 ">
                    <AvatarImage
                      src={
                        userProfile.imageurl ||
                        "/placeholder.svg?height=128&width=128"
                      }
                      alt={userProfile.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {userProfile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <CldUploadWidget
                    uploadPreset={uploadPresetvalue}
                    onSuccess={(result) => {
                      const info = result?.info as CloudinaryResult | undefined;
                      if (info) {
                        handleAvatarChange(info.url, info.public_id);
                      }
                    }}
                  >
                    {({ open }) => (
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault;
                          handleEdit("imageurl");
                          open();
                        }}
                      >
                        Change Avatar
                      </Button>
                    )}
                  </CldUploadWidget>
                </div>

                <div className="flex-grow space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <div className="flex items-center mt-1">
                      {isEditing.name ? (
                        <Input
                          id="name"
                          name="name"
                          value={userProfile.name}
                          onChange={handleChange}
                          className="flex-grow"
                        />
                      ) : (
                        <span className="text-lg">{userProfile.name}</span>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit("name")}
                        className="ml-2"
                      >
                        <Pencil size={16} />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-lg">{userProfile.email}</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="flex items-center mt-1">
                      {isEditing.location ? (
                        <Input
                          id="location"
                          name="location"
                          value={userProfile.location || ""}
                          onChange={handleChange}
                          className="flex-grow"
                        />
                      ) : (
                        <span className="text-lg">
                          {userProfile.location || "Not specified"}
                        </span>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit("location")}
                        className="ml-2"
                      >
                        <Pencil size={16} />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <div className="flex items-center mt-1">
                      {isEditing.bio ? (
                        <Textarea
                          id="bio"
                          name="bio"
                          value={userProfile.bio || ""}
                          onChange={handleChange}
                          className="flex-grow"
                        />
                      ) : (
                        <span className="text-lg">
                          {userProfile.bio || "No bio provided"}
                        </span>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit("bio")}
                        className="ml-2"
                      >
                        <Pencil size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="academic" className="mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <div className="flex items-center mt-1">
                    {isEditing.department ? (
                      <Input
                        id="department"
                        name="department"
                        value={userProfile.department || ""}
                        onChange={handleChange}
                        className="flex-grow"
                      />
                    ) : (
                      <span className="text-lg">
                        {userProfile.department || "Not specified"}
                      </span>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit("department")}
                      className="ml-2"
                    >
                      <Pencil size={16} />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="semester">Current Semester</Label>
                  <div className="flex items-center mt-1">
                    {isEditing.semester ? (
                      <Input
                        id="semester"
                        name="semester"
                        value={userProfile.semester || ""}
                        onChange={handleChange}
                        className="flex-grow"
                      />
                    ) : (
                      <span className="text-lg">
                        {userProfile.semester || "Not specified"}
                      </span>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit("semester")}
                      className="ml-2"
                    >
                      <Pencil size={16} />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <div className="flex items-center mt-1">
                    <span className="text-lg">{userProfile.role}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          {Object.values(isEditing).some(Boolean) && (
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
