import "./Integrations.scss";
import kingdom from "images/kingdom-image.jpg";
import pacman from "images/pacman-image.jpg";
import townsquare from "images/townsquare-image.jpg";
import stardew from "images/stardew-image.jpg";

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

                        <div className="inventory" style={{ "background-color": color }}>
                            View My Inventory
                        </div>
                        <div className="proposals">
                            Proposals
                        </div>

                        <ExternalLink link={link} />
                    </div>
                </div>
            ))}
        </div>
    );
}

function ExternalLink({ link }) {
    if(link) {
        return (
            <a href={link} target="_blank">Play this Game!</a>
        );
    }
    return null;
}

export default Integrations;