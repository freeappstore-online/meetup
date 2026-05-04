import { useState, useEffect } from "react";
import { fas } from "../lib/api";
import type { UserWithRoles } from "@freeappstore/sdk";

export function useAuth() {
  const [user, setUser] = useState<UserWithRoles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fas.auth.getUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signIn = () => fas.auth.signIn();

  const signOut = async () => {
    await fas.auth.signOut();
    setUser(null);
  };

  return { user, loading, signIn, signOut };
}
