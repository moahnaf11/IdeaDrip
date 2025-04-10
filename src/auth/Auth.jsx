import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";
function Auth({ children }) {
  const [isAuth, setIsAuth] = useState(true);

  if (isAuth) {
    return <AuthContext value={{ isAuth, setIsAuth }}>{children}</AuthContext>;
  } else {
    return <Navigate to="/product" />;
  }
}

export default Auth;
