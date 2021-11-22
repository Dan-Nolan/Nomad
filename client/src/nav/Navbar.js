import ProfileSection from './ProfileSection';
import "./Navbar.scss";
import logo from "images/nomad-logo-navbar@2x.png";
import UniverseSection from "./UniverseSection";

function Navbar() {
    return (
        <div className="navbar">
            <div className="left">
                <img src={logo} alt="logo"/>
            </div>
            <UniverseSection />
            <ProfileSection />
        </div>
    );
}

export default Navbar;
