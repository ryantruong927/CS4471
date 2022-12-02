"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selected: "overview" }
        this.updateTab = this.updateTab.bind(this)
    }

    updateTab(state) {
        this.setState({ selected: state })
    }

    render() {
        let tab
        switch (this.state.selected) {
            case "overview":
                tab = <Overview />
                break
            case "posts":
                tab = <Posts />
                break
            case "members":
                tab = <Members />
                break
        }

        return (
            <div>
                <Navbar company="Google" name="Ryan" />
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
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)