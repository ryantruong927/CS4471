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
                <Fourm/>
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
    }

    render() {
        {Create}
    }
}

function Fourm(props) {

    let create = <button className="companybtn pill"><p>Create</p></button>

    const titleField = <div className="field">
        <label htmlFor="title">Company Name: </label>
        <input type="text" id="title" autoComplete="off" defaultValue={window.companyName}/>
    </div>

    const descriptionField = <div className="field">
        <label htmlFor="desc">Company Description: </label>
        <input type="text" id="desc" autoComplete="off" defaultValue={window.companyDescription}/>
    </div>

    const emailField = <div className="field">
        <label htmlFor="email">Contact Email: </label>
        <input type="text" id="email" autoComplete="off" defaultValue={window.companyEmail}/>
    </div>

    const phoneFeild = <div className="field">
        <label htmlFor="phone">Contact Phone Number: </label>
        <input type="text" id="phone" autoComplete="off" defaultValue={window.companyPhone}/>
    </div>

    return (
        <div id="edit">
            <br></br>
            { titleField }
            { descriptionField }
            { emailField }
            { phoneFeild }
            <br></br>
        <div id="save-btn">
            {create}
        </div>
        </div >
    )
}
const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)