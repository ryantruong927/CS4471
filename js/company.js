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
                <Company name="Google" desc="An Alphabet property" onClick={this.updateTab} />
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
        return (
            <div id="company-header">
                <h1>Google</h1>
                <div id="company-btns">
                    <button className="companybtn pill" onClick={() => this.props.onClick("overview")}>Overview</button>
                    <button className="companybtn pill" onClick={() => this.props.onClick("posts")}>Posts</button>
                    <button className="companybtn pill" onClick={() => this.props.onClick("members")}>Members</button>
                </div>
            </div >
        )
    }
}

function Overview(props) {
    return (
        <div id="overview">
            <p>An Alphabet property.</p>
            <div id="contactinfo">
                <h3>Contact Us</h3>
                <p>Email: google@google.ca</p>
                <p>Phone Number: (800) 123-4567</p>
            </div>
        </div>
    )
}

function Members(props) {
    return (
        <div id="members">
            <p>Hey</p>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)