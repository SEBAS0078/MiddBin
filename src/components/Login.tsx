import { useUserContext } from "@/hooks/useUser";
import styles from "@/styles/Login.module.css";

export default function Login() {
  const { user, signIn, signOut, error } = useUserContext();

  if (user) {
    return (
      <div className={styles.userContainer}>
        <span className={styles.userGreeting}>
          {user.user_metadata?.name?.split(" ")[0] || "User"}
        </span>

        <button
          type="button"
          className={styles.signOutButton}
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.userContainer}>
      <button type="button" className={styles.signInButton} onClick={signIn}>
        Sign in
      </button>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
