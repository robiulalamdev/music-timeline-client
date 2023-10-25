import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const navigate = useNavigate();

  const userTokensJSON = localStorage.getItem("userTokens");
  const userTokens = JSON.parse(userTokensJSON);
  const userEmail = userTokens ? userTokens?.email : "";
  useEffect(() => {
    if (!userEmail) {
      navigate("/");
      return null;
    }
  });
  return children;
}

export default PrivateRoute;
