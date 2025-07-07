import "../css/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">🎬 CineVault</span>
          <p className="footer-tagline">Your entertainment vault</p>
        </div>
        
        <div className="footer-links">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            Powered by TMDB
          </a>
        </div>
        
        <div className="footer-attribution">
          <span>Built with ❤️ by</span>
          <a href="https://itskj.vercel.app" target="_blank" rel="noopener noreferrer">
            itskj.vercel.app
          </a>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {currentYear} CineVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;