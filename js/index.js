"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companies: []
        }
        this.getcompanies = this.getcompanies.bind(this)
        this.setcompany = this.setcompany.bind(this)
        this.getcompanies();
    }
    setcompany(companies) {
        this.setState({ companies: companies });
    }

    getcompanies () {
        let test = []
        axios.post('http://localhost:4000/companies', {
        }).then((response) => {
            for (var i = 0; i < response.data.length; i++) { 
                console.error(response.data[i][1]); 
                test[i] = response.data[i][1].value
            }
            this.setcompany(test);
        });
    }

    
    render() {
        let createCompany = <button className="pill" onClick={() => window.location.href="createcompany.html"}><p>Create Company</p></button>
        return (
            <div>
                <br></br>
                <Navbar name="Log Out" />
                <div id="index">
                    <h1>Tickety</h1>
                    <p>Tickety is a ticketing platform that will allow users to communicate with the company through tickets they create.</p>
                    <p>Users will be able to comment, reply to other people's comments, and upvote the tickets they like the most.</p>
                    <p></p>
                    <h2>Companies:</h2>
                    <a className="pill" href="company.html">Google</a>
                    {this.state.companies.map((item)=><a key={item} className="pill" href="company.html">{item}</a>)}
                    
                </div>

                <br/>
                <br/>
                <div className="sql-tests">
                    <button className="pill" onClick={() => {
                        axios.post('http://localhost:4000/reset_companies', {}).then((response) => {
                            console.log(response)
                        });
                    }}>Reset Company table</button>
                    <button className="pill" onClick={() => {
                        axios.post('http://localhost:4000/new_company', {}).then((response) => {
                            console.log(response)
                        });
                    }}>New Company</button>
                    <button className="pill" onClick={() => {
                        axios.post('http://localhost:4000/companies', {}).then((response) => {
                            console.log(response)
                        });
                    }}>Get companies</button>
                    <button className="pill" onClick={() => {
                        axios.post('http://localhost:4000/reset_posts', {}).then((response) => {
                            console.log(response)
                        });
                    }}>Reset Posts table</button>
                    <button className="pill" onClick={() => {
                        axios.post('http://localhost:4000/new_post', {}).then((response) => {
                            console.log(response)
                        });
                    }}>New Post</button>
                    <button className="pill" onClick={() => {
                        axios.post('http://localhost:4000/posts', {}).then((response) => {
                            console.log(response)
                        });
                    }}>Get Posts</button>
                    <button className="pill" onClick={() => {
                        axios.post('http://localhost:4000/reset_tickets', {}).then((response) => {
                            console.log(response)
                        });
                    }}>Reset Tickets table</button>
                    <button className="pill" onClick={() => {
                        axios.post('http://localhost:4000/tickets', {}).then((response) => {
                            console.log(response)
                        });
                    }}>Get tickets</button>
                </div>
                <br/>
                <br/>

                <div id="create-btn">
                    {createCompany}
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)