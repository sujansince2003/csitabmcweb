export interface NoticeTypes {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  photo: string | null;
  publishedDate: Date;
  category: string;
  publishedBy: string;
  department: string;
  contactEmail: string;
  contactPhone: string | null;
  updatedAt: Date;
  publisherAvatar?: string;
}
