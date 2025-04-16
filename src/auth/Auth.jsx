import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { ImSpinner } from "react-icons/im";

function Auth({ children }) {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const authCheck = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/users/check`,
          {
            method: "GET",
            credentials: "include",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          // Hit /refresh
          const refreshResponse = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/users/refresh`,
            {
              method: "GET",
              credentials: "include",
              signal: controller.signal,
            },
          );

          if (!refreshResponse.ok) {
            navigate("/product"); // Still not authenticated
            return;
          }
          // Retry the original /check request with the new access token
          const retryResponse = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/users/check`,
            {
              method: "GET",
              credentials: "include",
              signal: controller.signal,
            },
          );
          if (!retryResponse.ok) {
            navigate("/product");
            return;
          }
          const retryData = await retryResponse.json();
          setIsAuth((prev) => {
            if (!prev) {
              return retryData.user;
            }
            return prev;
          });
          setIsAuthenticating(false);
          return;
        }
        const data = await response.json();

        setIsAuth((prev) => {
          if (!prev) {
            return data.user;
          }
          return prev;
        });

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
  }, [navigate, location.pathname]);

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
    return <AuthContext value={{ isAuth, setIsAuth }}>{children}</AuthContext>;
  }
}

export default Auth;
