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
        this.hider = this.hider.bind(this)

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
        if(response.data.message){
            this.setLoginStat(response.data.message)
            var err = document.getElementById("error");
            err.style.display = "flex";


            }else{
            Cookies.set("loggedIn", this.state.registerUser, { expires: 1 });
            this.setLoginStat(this.state.registerUser);
            window.location.href='index.html';
            }

        })
      };

      
       hider(){
        var log = document.getElementById("login-form");
        var reg = document.getElementById("reg-form");
        if (log.style.display === "none") {
            reg.style.display = "none";
            log.style.display = "flex";
        } else {
            reg.style.display = "flex";
            log.style.display = "none";
        }
      }


       login () {
        axios.post('http://localhost:4000/login', {
          username: this.state.loginUser,
          password: this.state.loginpassword, 
        }).then((response) => {
            if(response.data.message){
            this.setLoginStat(response.data.message);
            console.log("WHAT");
            var err = document.getElementById("err");
            err.style.display = "flex";
          }else{
            Cookies.set("loggedIn", response.data[0][0].value, { expires: 1 });
            this.setLoginStat(response.data[0][0].value);
            window.location.href='index.html';
          }
        });
      };


      logout () {
        Cookies.remove("loggedIn");
        var err1 = document.getElementById("error");
        var err2 = document.getElementById("err");
        err1.style.display = "none";
        err2.style.display = "none";

      };

    render() {
        return (
            <div className="App">
            <div id="login">
                <h1>Tickety</h1><br></br>

                <div id="reg-form" >
                <h3 id="labels">Register</h3>
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-envelope"></i>    <input type="email" placeholder="Email" name="Email"onChange={(e)=> {this.setEmail(e.target.value)}}/>
                    </div>
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-user"></i>  <input type="text"  placeholder="Username" name="userName" onChange={(e)=> {this.setRegisterUser(e.target.value)}}/>
                    </div>
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-lock"></i>    <input type="password" autoComplete="off" placeholder="Password" name="password"onChange={(e)=> {this.setRegisterPassword(e.target.value)}}/>
                    </div>
                    <button className="pill" onClick={this.register} >Create Account</button>
                    <button onClick={this.hider} className="pill">Already Have an account?</button>
                    <div className="pill" id="error" >Invalid Registration!</div>


                </div><br></br>
                <div id="login-form" >
                <h3 id="labels">Login</h3>
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-user"></i>  <input type="text" placeholder="Username" name="userName" onChange={(e)=> {this.setLoginUser(e.target.value)}}/>
                    </div>
                    <div className="login-form-item pill">
                        <i className="fa-solid fa-lock"></i>  <input type="password" autoComplete="off" placeholder="Password" name="password" onChange={(e)=> {this.setLoginPassword(e.target.value)}}/>
                    </div>
                    <button onClick={this.login} className="pill">Sign In</button>
                    <button onClick={this.hider} className="pill">New? Sign Up!</button>
                    <div className="pill" id="err"> Invalid Login!</div>

                </div>

                </div>
            </div>
          )
    }

}
const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)