export type EventTypes = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  category: string;
  tags: string;
  registrationFormUrl: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  startTime: string;
  endTime: string;
  organizer: string;
  availableSeats: number;
  registrationFeeBMC: number;
  registrationFee: number;
  image: {
    id: number;
    documentId: string;
    url: string;
  }[];
};
