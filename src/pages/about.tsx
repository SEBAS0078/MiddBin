import styles from "@/styles/About.module.css";

export default function About() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>About MiddBin</h1>

      <section className={styles.section}>
        <h2 className={styles.subHeader}>Meet the Developers</h2>

        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            <img
              src="/Developers/1730324663445.jpeg"
              alt="Sebastian C."
              className={styles.devImage}
              width="120"
              height="120"
            />
            <img
              src="/Developers/1738097311696.jpeg"
              alt="Arai H."
              className={styles.devImage}
              width="120"
              height="120"
            />
            <img
              src="/Developers/1750198482205.jpeg"
              alt="Sebastian P."
              className={styles.devImage}
              width="120"
              height="120"
            />
            <img
              src="/Developers/IMG_8508.jpg"
              alt="Shari B."
              className={styles.devImage}
              width="120"
              height="120"
            />
            <img
              src="/Developers/1689956341226.jpeg"
              alt="Ben K."
              className={styles.devImage}
              width="120"
              height="120"
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeader}>Our Story</h2>
        <p>
          Our Story We built this platform to bring true convenience to campus.
          We all know the struggle—limited recycling center hours (say goodbye
          to that fridge you thought you could drop off), and the hassle of
          getting oversized furniture delivered to the mail center. Whether
          you’re a senior looking to clear out clothes before graduation, a
          freshman hunting for a mini-fridge, or a student wanting to buy or
          sell anything in between, you can do it all right here—within the
          safety and close proximity of your own campus.
          <br />
          <br />
          We’re college students too, so this isn’t meant to be expensive. In
          fact, it’s the opposite. By eliminating shipping costs and card fees,
          you can simply meet up, pay in cash, send a quick and secure Venmo, or
          even give items away for free to de-clutter.
          <br />
          <br /> Proximity. Peer-to-peer. Peace-of-mind. That’s the MiddBin way.
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
