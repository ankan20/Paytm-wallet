import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAuthDetails() {
      try {
        let token = localStorage.getItem("token") || "";
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.data.username) {
          navigate("/signin");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        navigate("/signin");
      }
    }

    getAuthDetails();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {component}
    </>
  );
};

export default ProtectedRoute;
