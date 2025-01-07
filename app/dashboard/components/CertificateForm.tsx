"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CertificateFormData {
  participantName: string;
  eventId: string;
}

interface Event {
  id: string;
  title: string;
}

export default function CertificateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CertificateFormData>();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const onSubmit = async (data: CertificateFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create certificate");
      }

      reset();
      alert("Certificate created successfully!");
    } catch (error) {
      console.error("Error creating certificate:", error);
      alert("Failed to create certificate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="participantName">Participant Name</Label>
        <Input
          id="participantName"
          {...register("participantName", {
            required: "Participant name is required",
          })}
        />
        {errors.participantName && (
          <p className="text-red-500">{errors.participantName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="eventId">Event</Label>
        <Controller
          name="eventId"
          control={control}
          rules={{ required: "Event is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.eventId && (
          <p className="text-red-500">{errors.eventId.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Certificate"}
      </Button>
    </form>
  );
}
