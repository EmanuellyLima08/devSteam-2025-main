import { Link } from "react-router-dom"; // Importa o Link do React Router
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer} aria-label="Rodapé">
      <div className={styles.centerContent}>
        <div id="logo" role="button" className={styles.logo}>
          <i className="bi bi-controller fs-3 text-light"></i>
          {/* Coloca o Link aqui */}
          <Link to="/" className="navbar-brand fw-bold fs-5 m-0">
            DevSteam
          </Link>
        </div>
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
