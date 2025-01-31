import { ImageTypes } from "./image";

export interface MentorTypes {
  id: number;
  documentId: string;
  fullName: string;
  socialLink: string;
  role: string;
  image: ImageTypes;
}
