import React, { Component } from "react"


class TopSpotIts extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    } // c'tor


    render() {
        return (
            <div className="top-spotits">
                <h1 className="clickable-title title">Top Spotits</h1>
                 <ul>
                    <li>Elad Eckstein (Top-Hit)</li>
                    <li>Dur Ben Lulu (Top-Hit)</li>
                </ul>  
            </div>
        );
    }


} // TopSpotIts Component





export default TopSpotIts