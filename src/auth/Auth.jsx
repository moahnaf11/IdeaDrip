import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { ImSpinner } from "react-icons/im";

function Auth({ children }) {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const authCheck = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/check", {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          // hit /refresh
          const refreshResponse = await fetch(
            "http://localhost:3000/users/refresh",
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!refreshResponse.ok) {
            navigate("/product"); // Still not authenticated
            return;
          }
          // Retry the original /check request with the new access token
          const retryResponse = await fetch(
            "http://localhost:3000/users/check",
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!retryResponse.ok) {
            navigate("/product");
            return;
          }
          const retryData = await retryResponse.json();
          setIsAuth(retryData.user);
          setIsAuthenticating(false);
          return;
        }
        const data = await response.json();
        setIsAuth(data.user);
        setIsAuthenticating(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Auth check aborted");
        } else {
          console.log("Auth check failed:", err);
        }
        return null;
      }
    };
    authCheck();
    return () => {
      controller.abort();
    };
  }, [navigate]);

  if (isAuthenticating) {
    return (
      <div className="h-[100vh] flex justify-center">
        <div className="flex items-center gap-3">
          <div>Please Wait</div>
          <ImSpinner className="animate-spin size-8" />
        </div>
      </div>
    );
  } else {
    // return <Navigate to="/product" />;
    return <AuthContext value={{ isAuth, setIsAuth }}>{children}</AuthContext>;
  }
}

export default Auth;
