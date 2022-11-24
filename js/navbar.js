"use strict"

function Navbar(props) {
    return (
        <div id="navbar">
            <a href="/" id="navbar-title">TMS</a>
            <div id="navbar-items">
                <div className="navbar-item pill">
                    <i className="fa fa-search fa-xs"></i>
                    <input id="navbar-search" placeholder="Search"></input>
                </div>
                <div className="navbar-item pill">
                    <button id="navbar-userbtn">{props.name}</button>
                    <i className="fa fa-angle-down"></i>
                    <div></div>
                </div>
            </div>
        </div >
    )
}