import { TableProps } from "../types/interfaces";

const Table: React.FC<TableProps> = ({ posts }) => {
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
              <button>edit</button>
              <button>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
