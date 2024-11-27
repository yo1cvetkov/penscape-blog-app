export type Comment = {
  _id: string;
  createdAt: string;
  content: string;
  authorId: {
    username: string;
    email: string;
  };
};
