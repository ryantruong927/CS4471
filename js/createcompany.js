"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let back = <button className="companybtn pill" onClick={() => window.location.href="index.html"}><p>Back</p></button>
        return (
            <div>
                <br></br>
                <Navbar name="Ryan" />
                <div id="index">
                    <h1>Create a Company Page</h1>
                    <p>Tickety is a ticketing platform that will allow users to communicate with the company through tickets they create.</p>
                    <p>Users will be able to comment, reply to other people's comments, and upvote the tickets they like the most.</p>
                </div>
                <Fourm />
                <div id="create-btn">
                    {back}
                </div>
            </div>
        )
    }
}

class CreateCompany extends React.Component {
    constructor(props) {
        super(props)
        this.create = this.create.bind(this)
    }

    create() {
        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        var email = document.getElementById('email').value;

        axios.post('http://localhost:4000/company', {
            name: name,
            description: description, 
            email: email
        }).then((response) => {
            console.log(response);
        })
        window.location.href="index.html"
    }

    render() {
    }
}

function Fourm(props) {

    var company = new CreateCompany(props); 
    let create = <button className="companybtn pill" onClick={() => company.create()}><p>Create</p></button>

    const titleField = <div className="field">
        <label htmlFor="title">Company Name: </label>
        <input type="text" id="name" autoComplete="off"/>
    </div>

    const descriptionField = <div className="field">
        <label htmlFor="desc">Company Description: </label>
        <input type="text" id="description" autoComplete="off"/>
    </div>

    const emailField = <div className="field">
        <label htmlFor="email">Contact Email: </label>
        <input type="text" id="email" autoComplete="off"/>
    </div>

    return (

        <div id="edit">
            <br></br>
            { titleField }
            { descriptionField }
            { emailField }
            <br></br>
            <div id="save-btn">
                {create}
            </div>
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />);