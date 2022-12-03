"use strict"

function Edit(props) {

    let back = <button className="companybtn pill" onClick={() => props.onClick("overview")}><p>back</p></button>
    let save = <button className="companybtn pill"><p>save</p></button>

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
            <h1>Edit Company</h1>
            { titleField }
            { descriptionField }
            { emailField }
            { phoneFeild }
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
    }
    render() {}
}