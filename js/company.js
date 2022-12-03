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
        this.getcompanies = this.getcompanies.bind(this)
        this.getcompanies();
    }

    getcompanies () {
        
        axios.post('http://localhost:4000/getcompany', {
            id: this.state.id
        }).then((response) => {
            console.error(response.data)
            this.setState({ name: response.data[0][1].value });
            this.setState({ description: response.data[0][2].value });
            this.setState({ email: response.data[0][3].value });
        });
    }

    updateTab(state) {
        this.setState({ selected: state })
    }

    render() {
        let tab
        window.location = this.state.url[0] + "#" + this.state.selected
        switch (this.state.selected) {
            case "overview":
                tab = <Overview selected={this.state.selected} name={this.state.name} description={this.state.description} email={this.state.email} onClick={this.updateTab}/>
                break
            case "posts":
                tab = <Posts selected={this.state.selected} id={this.state.id} name={this.state.name} description={this.state.description} email={this.state.email} onClick={this.updateTab}/>
                break
            case "members":
                tab = <Members selected={this.state.selected} onClick={this.updateTab}/>
                break
            case "editcompany":
                tab = <Edit selected={this.state.selected} id={this.state.id} name={this.state.name} description={this.state.description} email={this.state.email} onClick={this.updateTab}/>
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
                <Navbar company={this.state.name} name={Cookies.get('loggedIn')} />
                <Company selected={this.state.selected} name={this.state.name} description={this.state.description} email={this.state.email} onClick={this.updateTab} />
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
                <h1>{this.props.name}</h1>
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
                <p>{props.description}</p>
            </div>
            <div className="infobox">
                <h2>Contact Us</h2>
                <p>Email: {props.email}</p>
            </div>
            <div id="edit-btn">
                {edit}
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)