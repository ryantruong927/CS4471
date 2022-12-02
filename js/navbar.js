"use strict"

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="navbar">
                <a id="navbar-title" href="index.html">Tickety</a>
                <div id="navbar-items">
                    <div className="navbar-item pill">
                        <i className="fa fa-search"></i>
                        <input id="navbar-search" placeholder="Search"></input>
                    </div>
                    <div>
                        <a className="navbar-item pill" id="navbar-userbtn" href="login.html">{this.props.name}</a>
                    </div>
                </div>
            </div >
        )
    }
}