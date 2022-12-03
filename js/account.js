"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.getuser = this.getuser.bind(this)
        this.getuser();
    }

    getuser () {
       var user = Cookies.get('loggedIn');
       console.log(user);
        axios.post('http://localhost:4000/getuser', {
          username: user, 
        }).then((response) => {
            if(response.data.message){
            console.log(response.data.message)
          }else{
            this.setUsername(response.data[0][0].value);
            this.setEmail(response.data[0][2].value);
        }
        });
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
    logout () {
        Cookies.remove("loggedIn");
      };

    render() {
        return (
            <div>
                <br></br>
                <Navbar name="Log Out" />
                <div id="account">
                    <h1>{this.state.username}</h1>
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