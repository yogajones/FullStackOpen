import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";

const NavigationBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };
  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <>
        Logged in as {user.username}
        <button onClick={handleLogout} style={{ marginLeft: "15px" }}>
          logout
        </button>
      </>
    </div>
  );
};

export default NavigationBar;
