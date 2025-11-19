import { useUserContext } from "@/hooks/useUser";

export default function LoginStatus() {
  const { user, signIn, signOut, error } = useUserContext();
  let item: React.ReactNode;
  if (user) {
    item = (
      <div>
        <p>Hello {user?.user_metadata?.name}</p>
        <input type="button" value="Sign out" onClick={signOut} />
      </div>
    );
  } else {
    item = <input type="button" value="Sign in with Google" onClick={signIn} />;
  }

  return (
    <div>
      {item}
      {error && <p>{error}</p>}
    </div>
  );
}
