"use strict"

function Manage(props) {

    let back = <button className="companybtn pill" onClick={() => props.onClick("members")}><p>back</p></button>
    let add = <button className="companybtn pill"><p>Add Member</p></button>
    let remove = <button className="companybtn pill"><p>Remove Member</p></button>

    const userField = <div className="field">
        <label htmlFor="title">Username: </label>
        <input type="text" id="title" autoComplete="off"/>
    </div>

    const roleField = <div className="field">
        <label htmlFor="title">Role: </label>
        <input type="text" id="title" autoComplete="off"/>
    </div>

    return (
        <div id="edit">
            <h1>Manage Members</h1>
            { userField }
            { roleField }
            <p></p>
            <div id="btn">
                {add}
                {remove}
            </div>
        <div id="back-btn">
            {back}
        </div>
        </div>
    )
}

class ManageMembers extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {}
}