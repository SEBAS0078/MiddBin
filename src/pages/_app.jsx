import "@/styles/globals.css";
import useUser, { UserContext } from "@/hooks/useUser";

export default function App({ Component, pageProps }) {
  const userData = useUser();
  return (
    <div>
      <UserContext.Provider value={userData}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </div>
  );
}
