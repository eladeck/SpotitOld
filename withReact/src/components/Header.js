import React, { Component } from "react"
// import pilotLogo from "./img/pilot-logo.jpg"


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    } // c'tor


    render() {
        var titleStyle = {
            display:"inline-block",
            top:"3%",
            position:"sticky",
            marginLeft:"25px",
            color:"#f5fff6",
        };
        var inputStyle = {
            display:"inline-block",
             marginLeft:"15px",
             height:"28px",
             borderRadius:"5px",
            };

            var aboutStyle = {
                display:"inline-block",
                top:"3%",
                position:"sticky",
                marginLeft:"1000px",
                color:"#f5fff6",
                textAlign:"right",
                
            }

            var pilotLogoStyle ={
                maxWidth:"71%",
                maxHeight:"90%",
                borderRadius:"50%",
                display:"inline-block",
                marginLeft:"1438px",
                position:"relative",
                top: "-47px",
            }

        
        return (
            <nav>
                {/* <h1>Spotit</h1> */}
                <div style={titleStyle}>Spotit</div>
                <input placeHolder="Search..." style={inputStyle} type="textbox"></input>
                <div style={aboutStyle}>About</div>
                <img onClick={() => alert("--you won profile--")} style={pilotLogoStyle} src={"./img/pilot-logo.jpg"} alt="not working" />
            </nav>
        );
    }


} // Header Component





export default Header