import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthFetch = () => {
  const navigate = useNavigate();

  const authFetch = useCallback(
    async (url, options = {}, retries = 1) => {
      const finalOptions = {
        ...options,
        credentials: "include",
      };

      try {
        let res = await fetch(url, finalOptions);

        // If 401 Unauthorized and retries left
        if (res.status === 401 && retries > 0) {
          const refresh = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/users/refresh`,
            {
              method: "GET",
              credentials: "include",
              signal: options.signal,
            },
          );

          if (!refresh.ok) {
            navigate("/product");
            return null;
          }

          // Retry the original request
          res = await fetch(url, finalOptions);
          if (res.status === 401) {
            navigate("/product");
            return null;
          }
        }

        return res;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("authFetch error:", err);
        }
        return null;
      }
    },
    [navigate],
  );

  return authFetch;
};
