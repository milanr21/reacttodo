import { Link } from "react-router-dom";
import MainLogoImg from "../assets/Logo.png";
import "../styles/component/Landing.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <img src={MainLogoImg} alt="Tasksy Logo" className="logo" />
        <h1 className="title">Welcome to Tasksy</h1>
        <p className="description">
          Streamline your tasks with our intuitive ToDo list app, designed to
          enhance productivity and organization. Effortlessly manage your daily
          activities and stay focused on what matters most.
        </p>
      </header>

      <div className="cta">
        <Link to="/todos" className="cta-button">
          Go to Tasksy
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
