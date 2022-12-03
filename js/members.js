"use strict"

function Members(props) {
    let members = []
    for (let i = 0; i < 10; i++)
        members.push(<Member key={i} memberNum={i + 1} />)

    let edit = <button className="companybtn pill" onClick={() => props.onClick("managemembers")}><p>Manage Members</p></button>

    return (
        <div id="members">
            <div className="member infobox">
                <h2>Project Leads</h2>
                {members}
            </div>
            <div className="member infobox">
                <h2>Developers</h2>
                {members}
            </div>
            <div className="member infobox">
                <h2>Moderators</h2>
                {members}
            </div>
            <div id="edit-btn">
                {edit}
            </div>
        </div>
    )
}

class Member extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <p>Member #{this.props.memberNum}</p>
            </div>
        )
    }
}