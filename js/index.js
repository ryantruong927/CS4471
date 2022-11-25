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
                    <h1>Test Company:</h1>
                    <a className="pill" href="company.html">Google</a>
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("page"));
root.render(<Page />)