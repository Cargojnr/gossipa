// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setUser)
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return user;
}
