## Nomad

Team Members: Dan Nolan, Derek Walker, Anthony Parente 

The Nomad Protocol is built for transferring assets across games and immersive social experiences. 

Nomad provides the missing incentive for game developers to cooperate and render NFTs which are shared across games (worlds) and governance frameworks (universes). The smart contracts provide a lightweight framework with plug-and-play governance and incentivization through protocol fees. 

### Website 

The application is hosted on https://mynomad.quest/ 

To login you will need a Universal Profile which adheres to the most recent standard for permissions. You will also need a browser-based wallet like Metamask with access to an address that has the SIGN permission on the Universal Profile. If you paste the Universal Profile address in the bar you should get a prompt to sign a message to login. 

Once you're logged in you'll be able navigate the website and play **The Lost Kingdom** to earn and mint a sword! This sword is transferrable between **The Lost Kingdom** and the **Town Square**. You can visit your inventory on the site to transfer the item between the two games. Notice how after the item has been transferred through the Nomad smart contracts to the appropriate game it will change the game experience!

**NOTE:** The Lost Kingdom is only playable on **Brave** and **Chrome** at the time of writing due to a canvas bug.

### Running the Application

This application includes **contracts** which can be deployed through [hardhat](https://hardhat.org/) scripts. These scripts deploy nomad and build all its state and resources. Once all dependencies are install you can add a `.env` with a `PRIVATE_KEY` and run these scripts with `npm hardhat run scripts/NAME_OF_SCRIPT.js --network lukso`. The contracts can also be tested with `npx hardhat test`.

The `client` folder contains a react application that runs the main UI. To run this UI you can navigate to the `client` folder and run `npm run start`. This application also requires both the **Town Square** and **Nomad World** games be running if you'd like to play the games and transfer the sword NFT between them. 

### Slide Deck

Check out our [Slide Deck](https://github.com/Dan-Nolan/Nomad/blob/0e5e9ca09bdddef6bb93e98edab505b87ddb69cd/design/Nomad.pdf)!