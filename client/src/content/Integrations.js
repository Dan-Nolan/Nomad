import "./Integrations.scss";
import kingdom from "images/kingdom-image.jpg";
import pacman from "images/pacman-image.jpg";
import townsquare from "images/townsquare-image.jpg";
import stardew from "images/stardew-image.jpg";
import { Link } from "react-router-dom";

const integrations = [{
    name: "The Lost Kingdom",
    img: kingdom,
    description: "Check out how awesome this game is. Its got really cool stuff and all that jazz",
    color: "#00511D",
    link: "https://tlk.mynomad.quest"
}, {
    name: "Town Square",
    description: "Check out how awesome this game is",
    color: "black",
    img: townsquare,
    link: "https://town.mynomad.quest"
}, {
    name: "Stardew Valley",
    description: "Check out how awesome this game is",
    color: "#1160B9",
    img: stardew
}, {
    name: "Pac-Man World",
    description: "Check out how awesome this game is",
    color: "#F60000",
    img: pacman
}];

function Integrations() {
    return (
        <div className="integrations">
            <div className="content-header">
                <div className="universe">
                    Alpha Universe
                </div>
                <h1>
                    Integrations
                </h1>
            </div>

            {integrations.map(({ name, img, description, color, link }) => (
                <div className="integration">
                    <img src={img} alt={name} />
                    <div className="info">
                        <h1> {name} </h1>
                        <p>
                            {description}
                        </p>

                        <Link to="/" className="internal-link">
                            <div className="inventory" style={{ "background-color": color }}>
                                View My Inventory
                            </div>
                        </Link>
                        <Link to="/proposals" className="internal-link">
                            <div className="proposals">
                                Proposals
                            </div>
                        </Link>

                        <ExternalLink link={link} />
                    </div>
                </div>
            ))}
        </div>
    );
}

function ExternalLink({ link }) {
    if (link) {
        return (
            <a href={link} className="external-link" target="_blank" rel="noreferrer">Play this Game!</a>
        );
    }
    return null;
}

export default Integrations;