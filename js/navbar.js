"use strict"

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dropdown: false }
        this.showDropdown = this.showDropdown.bind(this)
    }

    showDropdown() {
        this.setState({ dropdown: !this.state.dropdown })
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
                        <a className="navbar-item pill" id="navbar-userbtn" href="login.html">Sign In</a>
                    </div>
                </div>
            </div >
        )
    }
}