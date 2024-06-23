import { FunctionComponent } from "react";
import "./index.css";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <div id="footer">
      <a id="footer-copyright" href="#">
        &copy; LinkLite 2024
      </a>
    </div>
  );
};

export default Footer;
