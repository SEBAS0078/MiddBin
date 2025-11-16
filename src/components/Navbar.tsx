import Link from "next/link";
import Login from "@/components/Login";
import styles from "@/styles/NavBar.module.css";

export default function Navbar() {
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
          <li className={styles.navItem}>
            <Login />
          </li>
        </ul>
      </nav>
    </div>
  );
}
