import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>MiddBin</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <h1>MiddBin</h1>
        </main>
        <footer className={styles.footer}>CS312 Project Template</footer>
      </div>
    </>
  );
}
