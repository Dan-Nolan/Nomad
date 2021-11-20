import Login from './Login';
import "./Navbar.scss";

function Navbar() {
    return (
        <div className="navbar">
            <div className="left">
                Welcome to Nomad
            </div>
            <Login />
        </div>
    );
}

export default Navbar;
