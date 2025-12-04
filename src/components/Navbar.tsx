import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/NavBar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navWrapper}>
      <nav className={styles.navInner}>
        <div className={styles.logoWrapper}>
          <Image
            src="/MiddBinLogo.jpeg"
            alt="MiddBin Logo"
            fill
            className={styles.logoImage}
          />
        </div>
        <div className={styles.rightGroup}>
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
            <Link href="/profile" className={styles.navLink}>
              Profile
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
}
