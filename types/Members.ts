export type MemberTypes = {
  memberId: string;
  fullName: string;
  post: string;
  image: {
    url: string;
  };
  email?: string;
  facebookLink?: string;
  linkedLink?: string;
  githubLink?: string;
  tags?: string;
  description?: string | null;
};
