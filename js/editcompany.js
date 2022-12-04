"use strict"

function Edit(props) {

    var company = new EditCompany(props); 
    let back = <button className="companybtn pill" onClick={() => props.onClick("overview")}><p>back</p></button>
    let save = <button className="companybtn pill" onClick={() => company.edit()}><p>save</p></button>

    const titleField = <div className="field">
        <label htmlFor="title">Company Name: </label>
        <input type="text" id="name" autoComplete="off" defaultValue={props.name}/>
    </div>

    const descriptionField = <div className="field">
        <label htmlFor="desc">Company Description: </label>
        <input type="text" id="description" autoComplete="off" defaultValue={props.description}/>
    </div>

    const emailField = <div className="field">
        <label htmlFor="email">Contact Email: </label>
        <input type="text" id="email" autoComplete="off" defaultValue={props.email}/>
    </div>

    return (
        <div id="edit">
            <h1>Edit Company</h1>
            { titleField }
            { descriptionField }
            { emailField }
            <p></p>
            <div id="save-btn">
                {save}
            </div>
        <div id="back-btn">
            {back}
        </div>
        </div>
    )
}

class EditCompany extends React.Component {
    constructor(props) {
        super(props)
        this.edit = this.edit.bind(this)
    }

    edit() {
        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        var email = document.getElementById('email').value;

        axios.post('http://localhost:4000/editcompany', {
            name: name,
            description: description, 
            email: email
        }).then((response) => {
            console.log(response);
        })
    }

    render() {}
}