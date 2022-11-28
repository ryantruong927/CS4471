"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="login">
                <h1>Tickety</h1>
                <form id="login-form" action="index.html">
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-user"></i>   <input placeholder="Username"></input>
                    </div>
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-lock"></i>   <input placeholder="Password"></input>
                    </div>
                    <button className="pill">Sign In</button>
                    <button className="pill">Create Account</button>
                </form>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)