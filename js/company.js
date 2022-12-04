"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }

        let page = window.location.href.split("#")[1]
        if (window.location.href.split("#")[1] == undefined)
            page = "overview"
        this.state = {
            url: window.location.href.split("#"),
            selected: page
        }
        this.updateTab = this.updateTab.bind(this)

        let results = []
        let posts = []

        axios.post('http://localhost:4000/posts', { CompanyID: this.props.id }).then((response) => {
            results = response.data
            // console.log(results)
        }).finally(() => {
            for (let i = results.length - 1; i >= 0; i--) {
                posts.push(
                    {
                        companyId: results[i][1].value,
                        id: results[i][0].value,
                        title: results[i][2].value,
                        description: results[i][3].value,
                        date: results[i][4].value
                    }
                )
            }
        })

        this.state.posts = posts
    }

    updateTab(state) {
        this.setState({ selected: state })
    }

    render() {
        let tab
        window.location = this.state.url[0] + "#" + this.state.selected
        switch (this.state.selected) {
            case "overview":
                tab = <Overview selected={this.state.selected} onClick={this.updateTab} />
                break
            case "posts":
                tab = <Posts posts={this.state.posts} selected={this.state.selected} onClick={this.updateTab} />
                break
            case "members":
                tab = <Members selected={this.state.selected} onClick={this.updateTab} />
                break
            case "editcompany":
                tab = <Edit selected={this.state.selected} onClick={this.updateTab} />
                break
            case "managemembers":
                tab = <Manage selected={this.state.selected} onClick={this.updateTab} />
                break
            case "createpost":
                tab = <CreatePosts selected={this.state.selected} id={this.state.id} onClick={this.updateTab} />
                break
        }

        return (
            <div>
                <Navbar company="Google" name={Cookies.get('loggedIn')} />
                <Company selected={this.state.selected} name="Google" desc="An Alphabet property" onClick={this.updateTab} />
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
                <h1>Google</h1>
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