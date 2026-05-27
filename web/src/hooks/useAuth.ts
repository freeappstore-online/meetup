import { useState, useEffect } from "react";
import { fas } from "../lib/api";
import type { UserWithRoles } from "../sdk/auth";

export function useAuth() {
  const [user, setUser] = useState<UserWithRoles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fas.auth.getUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signIn = (provider?: 'github' | 'google') => fas.auth.signIn(provider);

  const signOut = async () => {
    await fas.auth.signOut();
    setUser(null);
  };

  return { user, loading, signIn, signOut };
}
