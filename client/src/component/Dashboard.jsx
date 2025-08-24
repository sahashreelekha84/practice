import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchdashboard, fetchsignup } from "../feature/Auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  // 👇 access state.Signup
  const { isLoading, postValue, error } = useSelector((state) => state.Signup);
  console.log('data',postValue);
  
 useEffect(() => {
    dispatch(fetchdashboard());
  }, [dispatch]);
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {postValue.data ? (
        <div>
          <p><strong>Name:</strong> {postValue.data.name}</p>
          <p><strong>Email:</strong> {postValue.data.email}</p>
        </div>
      ) : (
        <p>No user data</p>
      )}

      <button onClick={() => dispatch(fetchsignup({ name: "Test", email: "test@test.com", password: "123" }))}>
        Trigger Signup
      </button>
    </div>
  );
};

export default Dashboard;
