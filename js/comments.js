"use strict"

function Comments(props) {
    return (
        <div id="comments">
            <Comment name="Ryan" text="Isn't that obvious? Downvoted." />
            <Comment name="Brian" text="^ This guy must be fun at parties" />
        </div>
    )
}

class Comment extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="comment">
                {this.props.name}
                <br></br>
                {this.props.text}
            </div>
        )
    }
}