"use strict"

class Page extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div>
                <Navbar name="Ryan" />
                <div id="index">
                    <h1>TMS</h1>
                    <p>A tool for receiving user feedback.</p>
                    <h1>Followed Companies:</h1>
                    <a href="/company.html">Google</a>
                    <p></p>
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)