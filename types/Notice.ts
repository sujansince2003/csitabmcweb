export interface NoticeTypes {
  id: string;
  documentId: string;
  title: string;
  description: string;
  image: { url: string }[];
  publishedAt: Date;
  category: string;
}
