import Link from "next/link";
import styles from "../styles/Home.module.css";
import type { FC } from "react";
import { useState, useEffect } from "react";

const useLocation = () => {
  const [page, setPage] = useState<string>("");
  useEffect(() => {
    setPage(window.location.pathname);
  }, []);
  return page;
};

const Layout: FC = ({ children }) => {
  const page = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{page}</h3>
        <Link href="/">
          <a className={page === "/" ? styles.activelink : styles.link}>
            Start
          </a>
        </Link>
        <Link href="/about">
          <a className={page === "/about" ? styles.activelink : styles.link}>
            About
          </a>
        </Link>
        <Link href="/blog">
          <a className={page === "/blog" ? styles.activelink : styles.link}>
            Blog
          </a>
        </Link>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Layout;
