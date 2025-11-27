import styles from "@/styles/About.module.css";

export default function About() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>About MiddBin</h1>

      <section className={styles.section}>
        <h2 className={styles.subHeader}>Our Mission</h2>
        <p>
          MiddBin is a student-run marketplace designed to give Middlebury
          students an easier, faster, and more reliable way to buy, sell, and
          exchange items around campus. The goal is simple: empower students to
          find what they need, reduce waste, and build a more connected campus
          community.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeader}>How It Works</h2>
        <ul className={styles.list}>
          <li>Create listings with photos and item details.</li>
          <li>Browse items posted by other students.</li>
          <li>Contact sellers easily to ask questions or arrange pickups.</li>
          <li>
            All transactions take place on campus for convenience and safety.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeader}>What This Site Offers</h2>
        <ul className={styles.list}>
          <li>Student-to-student marketplace focused on usability</li>
          <li>Fast posting and browsing of listings</li>
          <li>Reliable communication between buyers and sellers</li>
          <li>A clean, simple design made for Middlebury students</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeader}>Why Join?</h2>
        <p>
          Whether you're looking for textbooks, room decor, dorm furniture,
          winter gear, or electronics, MiddBin makes it effortless to connect
          with other students. Save money, reduce waste, and support a smarter,
          more sustainable community.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeader}>Community Guidelines</h2>
        <ul className={styles.list}>
          <li>Be respectful and honest in all communications.</li>
          <li>Only post items that comply with Middlebury policies.</li>
          <li>Respond promptly when buying or selling.</li>
          <li>
            Report concerning or suspicious listings to help keep the platform
            safe.
          </li>
        </ul>
      </section>
    </div>
  );
}
