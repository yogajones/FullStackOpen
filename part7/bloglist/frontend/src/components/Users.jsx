import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const allUsers = useSelector((state) => state.user.all);
  return (
    <div>
      <h2>Users</h2>
      <table style={{ tableLayout: "auto" }}>
        <thead>
          <tr>
            <th style={{ width: "50%", textAlign: "center" }}>User</th>
            <th style={{ width: "50%", textAlign: "right" }}>Blogs added</th>
          </tr>
        </thead>
        <tbody>
          {allUsers &&
            allUsers.map((user) => (
              <tr key={user.id}>
                <td style={{ textAlign: "center" }}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td style={{ textAlign: "right" }}>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
