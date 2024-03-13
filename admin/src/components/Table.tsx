import { TableProps } from "../types/interfaces";

const Table: React.FC<TableProps> = ({ posts, deletePost }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>TTITLE</th>
          <th>DATE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.name}</td>
            <td>{post.date}</td>
            <td>
              <button onClick={() => deletePost(post.id)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
