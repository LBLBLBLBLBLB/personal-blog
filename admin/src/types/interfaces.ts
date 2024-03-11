export interface Post {
  id: string;
  name: string;
  date: string;
}

export interface TableProps {
  posts: Post[];
  deletePost: (postId: string) => void;
}
