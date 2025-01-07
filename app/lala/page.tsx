"use client";
import { useState } from "react";

export default function BulkCertificateForm() {
  const [participants, setParticipants] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const participantArray = participants
        .split("\n")
        .map((name) => ({ participantName: name.trim() }))
        .filter((p) => p.participantName);

      const response = await fetch("/api/certificates/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          participants: participantArray,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Successfully created ${result.count} certificates!`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating certificates.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <textarea
        className="block w-full border p-2"
        rows={10}
        placeholder="Enter participant names, one per line"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className="block w-full border p-2 mt-2"
      />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-2 bg-blue-500 text-white py-2 px-4"
      >
        {isSubmitting ? "Generating..." : "Generate Certificates"}
      </button>
    </div>
  );
}
