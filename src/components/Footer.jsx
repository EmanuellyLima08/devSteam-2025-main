import { Link } from "react-router-dom"; // Importa o Link do React Router
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} aria-label="Rodapé">
      <div className={styles.centerContent}>
      <Link to="/" id="logo" className={`${styles.logo} text-decoration-none`} role="button">
  <img src="/src/img/logo-dev-steam.png" alt="Logo DevSteam" className={styles.logoImage} />
  <span className="navbar-brand fw-bold fs-5 m-0 text-light">DevSteam</span>
</Link>

        <p className={styles.direitos}>Todos os direitos reservados ©</p>
        <div className={styles.social}>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            <i className="bi bi-tiktok"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <i className="bi bi-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
