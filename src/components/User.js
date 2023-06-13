import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../redux/users/userSlice";

const Users = () => {
  const { users, isLoading, error } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error.message}</div>;
  }

  return (
    <>
      <ul className="users">
        {users.map((user) => (
          <div key={user.login.uuid}>
            <li>
              Name:
              {user.name.first} {user.name.last}
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Users;
