"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CldUploadWidget } from "next-cloudinary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import Link from "next/link";

const uploadPresetvalue =
  process.env.NEXT_PUBLIC_CLOUDINARY_NOTICE_UPLOAD_PRESET;

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fullContent: z.string().optional(),
  publishedDate: z.string().min(1, "Published date is required"),
  publishedBy: z.string().min(1, "Publisher is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.string(),
  department: z.string().min(1, "Department is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().optional(),
  location: z.string().optional(),
  photo: z.any().optional(),
  photopublicId: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CloudinaryResult {
  public_id: string;
  url: string;
}

export default function UploadNotice() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    tags: "important, notice,CSIT",
    department: "CSIT Department",
    publishedBy: "CSIT Department of BMC",
    contactEmail: "csitassociationbmc@gmail.com",
    contactPhone: "9843409076",
    location: "Golpark,Butwal,Nepal",
    category: "administrative",
    publishedDate: new Date().toISOString().split("T")[0],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      fullContent: "",
      publishedDate: defaultValues.publishedDate,
      publishedBy: defaultValues.publishedBy,
      category: defaultValues.category, // Set default category
      tags: defaultValues.tags,
      department: defaultValues.department,
      contactEmail: defaultValues.contactEmail,
      contactPhone: defaultValues.contactPhone,
      location: defaultValues.location,
    },
  });

  useEffect(() => {
    // Update form values when defaultValues change
    form.reset({
      ...form.getValues(),
      publishedBy: defaultValues.publishedBy,
      category: defaultValues.category, // Include category in reset
      tags: defaultValues.tags,
      department: defaultValues.department,
      contactEmail: defaultValues.contactEmail,
      contactPhone: defaultValues.contactPhone,
      location: defaultValues.location,
    });
  }, [defaultValues, form]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(",").map((tag) => tag.trim()),
          photo: photoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create notice");
      }

      router.push("/notices");
    } catch (error) {
      console.error("Error creating notice:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldClick = (fieldName: keyof typeof defaultValues) => {
    setDefaultValues((prev) => ({
      ...prev,
      [fieldName]: form.getValues(fieldName),
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {session && session.user.role === "ADMIN" ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Upload New Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[200px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="publishedDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publish Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="date" {...field} />
                            <Calendar
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={20}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleFieldClick("category");
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="administrative">
                              Administrative
                            </SelectItem>
                            <SelectItem value="events">Events</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="hidden">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g. registration, deadline, important"
                            onClick={() => handleFieldClick("tags")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onClick={() => handleFieldClick("department")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publishedBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Published By</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onClick={() => handleFieldClick("publishedBy")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          onClick={() => handleFieldClick("contactEmail")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          onClick={() => handleFieldClick("contactPhone")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onClick={() => handleFieldClick("location")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notice Photo</FormLabel>
                      <FormControl className="hidden">
                        <Input
                          {...field}
                          value={photoUrl}
                          onChange={() => {}}
                        />
                      </FormControl>
                      <CldUploadWidget
                        uploadPreset={uploadPresetvalue}
                        onSuccess={(result) => {
                          const info = result?.info as
                            | CloudinaryResult
                            | undefined;
                          if (info) {
                            setPhotoUrl(info.url);
                            form.setValue("photo", info.url); // Sync with form
                            form.setValue("photopublicId", info.public_id); // Sync with form
                          }
                        }}
                      >
                        {({ open }) => (
                          <button
                            className="block text-gray-50 bg-blue-500 p-3 rounded-2xl"
                            onClick={(e) => {
                              e.preventDefault();
                              open();
                            }}
                          >
                            Upload an Image
                          </button>
                        )}
                      </CldUploadWidget>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {photoUrl && (
                  <div className="mt-4">
                    <img
                      src={photoUrl}
                      alt="Uploaded preview"
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Upload Notice"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <div className="container mx-auto p-4 max-w-4xl">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Admin Access Required
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    You must be logged in as an admin to upload
                    notices.&nbsp;&nbsp;
                    <Link className="text-blue-500" href="/login">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  );
}
