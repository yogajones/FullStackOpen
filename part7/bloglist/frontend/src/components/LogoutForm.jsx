import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";

const LogoutForm = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      Logged in as {user.username}
      <button onClick={handleLogout} style={{ marginLeft: "15px" }}>
        logout
      </button>
    </>
  );
};

export default LogoutForm;
