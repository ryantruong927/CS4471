"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "ryantruong927",
            firstname: "Ryan",
            lastname: "Truong",
            password: "123456",
            email: "ryantruong927@gmail.com"
        }
    }

    setUsername(username) {
        this.setState({ username: username })
    }

    setFirstname(firstname) {
        this.setState({ firstname: firstname })
    }

    setLastname(lastname) {
        this.setState({ lastname: lastname })
    }

    setPassword(password) {
        this.setState({ password: password })
    }

    setEmail(email) {
        this.setState({ email: email })
    }

    render() {
        return (
            <div>
                <br></br>
                <Navbar name="Ryan" />
                <div id="account">
                    <h1>Hello Ryan!</h1>
                    <div id="account-details">
                        <div id="account-nav">
                            <button className="account-button">View Details</button>
                            <button className="account-button">View Reputation</button>
                        </div>
                        <div className="card" id="account-content">
                            <div className="account-field">
                                <label>User Name:</label>
                                <input htmlFor="username" type="text" value={this.state.username} className="account-input pill" title="Cannot change username" disabled />
                            </div>
                            <div className="account-field">
                                <label>First Name: </label>
                                <input htmlFor="firstname" type="text" value={this.state.firstname} className="account-input pill" onChange={e => this.setFirstname(e.target.value)} />
                            </div>
                            <div className="account-field">
                                <label>Last Name:</label>
                                <input htmlFor="lastname" type="text" value={this.state.lastname} className="account-input pill" onChange={e => this.setLastname(e.target.value)} />
                            </div>
                            <div className="account-field">
                                <label>Password:</label>
                                <input htmlFor="password" type="password" value={this.state.password} className="account-input pill" onChange={e => this.setPassword(e.target.value)} />
                            </div>
                            <div className="account-field">
                                <label>Email:</label>
                                <input htmlFor="email" type="text" value={this.state.email} className="account-input pill" onChange={e => this.setEmail(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)