export interface Post {
  id: string;
  article: string;
  name: string;
  date: string;
}

export interface TableProps {
  posts: Post[];
  deletePost: (postId: string) => void;
}
