import "./Integrations.scss";
import kingdom from "images/kingdom-image.jpg";
import pacman from "images/pacman-image.jpg";
import townsquare from "images/townsquare-image.jpg";
import stardew from "images/stardew-image.jpg";
import { Link } from "react-router-dom";

const integrations = [{
    name: "The Lost Kingdom",
    img: kingdom,
    description: "Fight your way through hordes of skeletons, bats and ogre archers in this exciting browser demo game!",
    color: "#00511D",
    link: "https://tlk.mynomad.quest"
}, {
    name: "Town Square",
    description: "Visit to hang out with friends and show cool items that you earned questing in the Nomad universes!",
    color: "black",
    img: townsquare,
    link: "https://town.mynomad.quest"
}, {
    name: "Stardew Valley",
    description: "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life!",
    color: "#1160B9",
    img: stardew
}, {
    name: "Pac-Man World",
    description: "James Halliday is said to have earned a perfect score on Pac-Man in the Gregarious Games break room.",
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