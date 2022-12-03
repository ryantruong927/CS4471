"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            registerUser: "" ,
            registerPassword: "",
            loginUser: "",
            loginpassword: "",
            email: "",
            loginStat: ""
        }
        this.setRegisterUser = this.setRegisterUser.bind(this)
        this.setRegisterPassword = this.setRegisterPassword.bind(this)
        this.setLoginUser = this.setLoginUser.bind(this)
        this.setLoginPassword = this.setLoginPassword.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setLoginStat = this.setLoginStat.bind(this)
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)

    }

    setRegisterUser(registerUser) {
        this.setState({ registerUser: registerUser });
    }
    setRegisterPassword(registerPassword) {
        this.setState({ registerPassword: registerPassword });
    }
    setLoginUser(loginUser) {
        this.setState({ loginUser: loginUser });
    }
    setLoginPassword(loginpassword) {
        this.setState({ loginpassword: loginpassword });
    }
    setEmail(email) {
        this.setState({ email: email });
    }
    setLoginStat(loginStat) {
        this.setState({ loginStat: loginStat });
    }

    register() {
        axios.post('http://localhost:4000/register', {
          username: this.state.registerUser,
          password: this.state.registerPassword, 
          email: this.state.email
        }).then((response) => {
          console.log(response);
        })
      };

       login () {
        axios.post('http://localhost:4000/login', {
          username: this.state.loginUser,
          password: this.state.loginpassword, 
        }).then((response) => {
            if(response.data.message){
            this.setLoginStat(response.data.message)
          }else{
            Cookies.set("loggedIn", response.data[0][0].value, { expires: 1 });
            this.setLoginStat(response.data[0][0].value);
            window.location.href='index.html';
          }
        });
      };


      logout () {
        Cookies.remove("loggedIn");
      };

    render() {
        return (
            <div className="App">
            <div id="login">
                <h1>Tickety</h1><br></br>

                <h3>Register</h3>
                <div id="login-form" >
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-envelope"></i>    <input type="text" placeholder="Email" name="Email"onChange={(e)=> {this.setEmail(e.target.value)}}/>
                    </div>
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-user"></i>  <input type="text"  placeholder="Username" name="userName" onChange={(e)=> {this.setRegisterUser(e.target.value)}}/>
                    </div>
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-lock"></i>    <input type="password" autocomplete="off" placeholder="Password" name="password"onChange={(e)=> {this.setRegisterPassword(e.target.value)}}/>
                    </div>
                    <button className="pill" onClick={this.register} >Create Account</button>
                </div><br></br>

                <h3>Login</h3>
                <div id="login-form" >
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-user"></i>  <input type="text" placeholder="Username" name="userName" onChange={(e)=> {this.setLoginUser(e.target.value)}}/>
                    </div>
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-lock"></i>  <input type="password" autocomplete="off" placeholder="Password" name="password" onChange={(e)=> {this.setLoginPassword(e.target.value)}}/>
                    </div>
                    <button onClick={this.login} className="pill">Sign In</button>
                </div>

                </div>
            </div>
          )
    }

}
const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)