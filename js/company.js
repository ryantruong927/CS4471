"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)

        let id = window.location.href.split("id=")[1].split("#")[0]
        let page = window.location.href.split("#")[1]
        if (window.location.href.split("#")[1] == undefined)
            page = "overview"

        this.state = {
            url: window.location.href.split("#"),
            selected: page,
            id: id,
            name: "",
            description: "",
            email: ""
        }
        this.updateTab = this.updateTab.bind(this)
    }

    updateTab(state) {
        this.setState({ selected: state })
    }

    render() {
        let tab
        window.location = this.state.url[0] + "#" + this.state.selected
        switch (this.state.selected) {
            case "overview":
                tab = <Overview selected={this.state.selected} onClick={this.updateTab}/>
                break
            case "posts":
                tab = <Posts selected={this.state.selected} onClick={this.updateTab}/>
                break
            case "members":
                tab = <Members selected={this.state.selected} onClick={this.updateTab}/>
                break
            case "editcompany":
                tab = <Edit selected={this.state.selected} onClick={this.updateTab}/>
                break 
            case "managemembers":
                tab = <Manage selected={this.state.selected} onClick={this.updateTab}/>
                break 
            case "createpost":
                tab = <CreatePosts selected={this.state.selected} onClick={this.updateTab}/>
                break 
        }

        return (
            <div>
                <Navbar company="Google" name="Ryan" />
                <Company id={this.state.id} selected={this.state.selected} name="Google" desc="An Alphabet property" onClick={this.updateTab} />
                {tab}
            </div>
        )
    }
}

class Company extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let buttons = []
        switch (this.props.selected) {
            case "overview":
                buttons.push(
                    <button key={0} className="companybtn-focused pill" onClick={() => this.props.onClick("overview")}>Overview</button>)
                buttons.push(
                    <button key={1} className="companybtn pill" onClick={() => this.props.onClick("posts")}>Posts</button>)
                buttons.push(
                    <button key={2} className="companybtn pill" onClick={() => this.props.onClick("members")}>Members</button>)

                break;
            case "posts":
                buttons.push(
                    <button key={0} className="companybtn pill" onClick={() => this.props.onClick("overview")}>Overview</button>)
                buttons.push(
                    <button key={1} className="companybtn-focused pill" onClick={() => this.props.onClick("posts")}>Posts</button>)
                buttons.push(
                    <button key={2} className="companybtn pill" onClick={() => this.props.onClick("members")}>Members</button>)

                break;
            case "members":
                buttons.push(
                    <button key={0} className="companybtn pill" onClick={() => this.props.onClick("overview")}>Overview</button>)
                buttons.push(
                    <button key={1} className="companybtn pill" onClick={() => this.props.onClick("posts")}>Posts</button>)
                buttons.push(
                    <button key={2} className="companybtn-focused pill" onClick={() => this.props.onClick("members")}>Members</button>)

                break;
        }
        return (
            <div id="company-header">
                <h1>{this.props.id}</h1>
                <div id="company-btns">
                    {buttons}
                </div>
            </div >
        )
    }
}

function Overview(props) {

    let edit = <button className="companybtn pill" onClick={() => props.onClick("editcompany")}><p>Edit Company</p></button>

    return (
        <div id="overview">
            <div id="overview-body">
                <p>Google Stadia will be discontinued on January 18th, 2023</p>
                <p>Go check out the Google Stadia while you can!</p>
            </div>
            <div className="infobox">
                <h2>Contact Us</h2>
                <p>Email: google@google.ca</p>
                <p>Phone Number: (800) 123-4567</p>
            </div>
            <div id="edit-btn">
                {edit}
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)