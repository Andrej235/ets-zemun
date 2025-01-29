import Icon from "@components/icon/icon";
import "./app-footer.scss";

export default function AppFooter() {
  return (
    <footer id="app-footer">
      <div className="social-media-icons-container">
        <a href="https://www.linkedin.com">
          <Icon name="linkedin" />
        </a>

        <a href="https://www.youtube.com">
          <Icon name="youtube" />
        </a>

        <a href="https://www.x.com">
          <Icon name="twitter" />
        </a>

        <a href="https://www.facebook.com">
          <Icon name="facebook" />
        </a>

        <a href="https://www.instagram.com">
          <Icon name="instagram" />
        </a>
      </div>

      <h1 className="footer-title">
        &copy; 2024 Elektrotehnička škola "Zemun"
      </h1>
    </footer>
  );
}

