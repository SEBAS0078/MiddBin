import Link from "next/link";
import styles from "@/styles/NavBar.module.css";

export default function About() {
  return (
    <div>
      <nav>
        <ul className={styles.navBar}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <h1>About</h1>
      <p>I will add stuff later just testing for now</p>
    </div>
  );
}
