import { useUserContext } from "@/hooks/useUser";
import styles from "@/styles/NavBar.module.css";

export default function Login() {
  const { user, signIn, signOut, error } = useUserContext();

  if (user) {
    return (
      <div className={styles.loginStatus}>
        <span className={styles.userName}>
          {user.user_metadata?.name?.split(" ")[0] || "User"}
        </span>
        <button type="button" className={styles.authButton} onClick={signOut}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.loginStatus}>
      <button type="button" className={styles.authButton} onClick={signIn}>
        Sign in
      </button>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
