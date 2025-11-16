import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase_client";

export type UserHookType = {
  user: User | null;
  error: string | null;
  signIn: () => void;
  signOut: () => void;
};
export const UserContext = createContext<UserHookType | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContext.Provider",
    );
  }
  return context;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) setError(error.message);
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
  }, []);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: newUser },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
      } else {
        setUser(newUser);
      }
    };

    getUser();
    // Subscribe to auth state changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, error, signIn, signOut };
}
