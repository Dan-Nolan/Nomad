import "./Proposals.scss";

const proposals = [{
    title: "New Fancy Sword",
    type: "Resource Creation",
    created: "11/11/2021",
    votesFor: "66.7K",
    votesAgainst: "7.4K",
    state: "active",
}, {
    title: "Export Tax to 0.2%",
    type: "Contract Change",
    created: "11/4/2021",
    votesFor: "15.1K",
    votesAgainst: "14.2K",
    state: "pending"
}, {
    title: "Town Square Grant",
    type: "Token Distribution",
    created: "11/1/2021",
    votesFor: "44.2",
    votesAgainst: "6.2K",
    state: "queued"
}, {
    title: "Adds Stardew Valley",
    type: "New Integration",
    created: "10/19/2021",
    votesFor: "51.4K",
    votesAgainst: "2.2K",
    state: "executed"
}];

function Proposals() {
    return (
        <div className="proposals-content">
            <div className="content-header">
                <div className="universe">
                    Alpha Universe
                </div>
                <h1>
                    Proposals
                </h1>
            </div>

            <div className="proposals">
                <div className="header">
                    <div className="number">
                        {proposals.length} Proposals
                    </div>

                    <div className="create-proposal">
                        + Create New Proposal
                    </div>
                </div>

                {proposals.map(({ title, type, created, votesFor, votesAgainst, state }) => {
                    const stateClasses = ["state", state];
                    return (
                        <div className="proposal">
                            <div className="title">
                                <div className="display">{title}</div>
                                <div className={stateClasses.join(" ")}>{state}</div>
                            </div>
                            <div className="proposal-info">
                                <div className="attributes">
                                    <div className="attribute">
                                        <div className="title">
                                            Type:
                                        </div>
                                        <div className="value">
                                            { type }
                                        </div>
                                    </div>
                                    <div className="attribute">
                                        <div className="title">
                                            Created:
                                        </div>
                                        <div className="value">
                                            { created }
                                        </div>
                                    </div>
                                </div>
                                <div className="spacer"></div>
                                <div className="votes">
                                    <div className="vote for">
                                        <div className="title">
                                            Votes For:
                                        </div>
                                        <div className="value">
                                            { votesFor }
                                        </div>
                                    </div>
                                    <div className="vote against">
                                        <div className="title">
                                            Votes Against:
                                        </div>
                                        <div className="value">
                                            { votesAgainst }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Proposals;