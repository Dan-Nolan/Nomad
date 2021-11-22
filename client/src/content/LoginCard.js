import Login from './Login';
import icon from "images/nomad-icon-login@2x.png";
import "./LoginCard.scss";

function LoginCard() {
    return (
        <div className="content">
            <div className="login-card">
                <div className="icon">
                    <img src={icon} alt="icon" />
                </div>
                <div className="instructions">
                    Please enter your Universal Profile address below:
                </div>
                <Login />
            </div>
        </div>
    );
}

export default LoginCard;
