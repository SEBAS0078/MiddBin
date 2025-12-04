import "@/styles/globals.css";
import useUser, { UserContext } from "@/hooks/useUser";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
  const userData = useUser();
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
