"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "@/components/ui/date-timei-picker";

interface EventFormData {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  organizer: string;
  category: string;
  tags: string;
}

export default function EventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EventFormData>();

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      reset();
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Controller
          name="startDate"
          control={control}
          rules={{ required: "Start date is required" }}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        {errors.startDate && (
          <p className="text-red-500">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Controller
          name="endDate"
          control={control}
          rules={{ required: "End date is required" }}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        {errors.endDate && (
          <p className="text-red-500">{errors.endDate.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="organizer">Organizer</Label>
        <Input
          id="organizer"
          {...register("organizer", { required: "Organizer is required" })}
        />
        {errors.organizer && (
          <p className="text-red-500">{errors.organizer.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          {...register("category", { required: "Category is required" })}
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          {...register("tags", { required: "At least one tag is required" })}
        />
        {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Event"}
      </Button>
    </form>
  );
}
