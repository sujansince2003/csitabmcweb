import CertificateForm from "./components/CertificateForm";
import EventForm from "./components/EventForm";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Create Event</h2>
          <EventForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Create Certificate</h2>
          <CertificateForm />
        </div>
      </div>
    </div>
  );
}
