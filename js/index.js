"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let createCompany = <button className="pill" onClick={() => window.location.href="createcompany.html"}><p>Create Company</p></button>
        return (
            <div>
                <br></br>
                <Navbar name="Sign In" />
                <div id="index">
                    <h1>Tickety</h1>
                    <p>Tickety is a ticketing platform that will allow users to communicate with the company through tickets they create.</p>
                    <p>Users will be able to comment, reply to other people's comments, and upvote the tickets they like the most.</p>

                    <h2>Test Company:</h2>
                    <a className="pill" href="company.html">Google</a>
                </div>
                <div id="create-btn">
                    {createCompany}
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)