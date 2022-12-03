"use strict"

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }


    logout () {
        Cookies.remove("loggedIn");
        window.location.href='login.html';

      };
    
    render() {
        return (
            <div id="navbar">
                <a id="navbar-title" href="index.html">Tickety</a>
                <div id="navbar-items">
                    <div>
                        <button className="navbar-item pill" onClick={this.logout} id="navbar-userbtn" href="login.html">{this.props.name}</button>
                    </div>
                    <div>
                        <button className="navbar-item pill" id="navbar-userbtn" onClick={() => {window.location.href="account.html"}}>Update</button>
                    </div>
                </div>
            </div >
        )
    }
}