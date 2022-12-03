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
            <div className="ticket-comment">
                <div className="names">
                    <h4>{this.props.name}</h4>
                    <p>@{this.props.username}</p>
                </div>
                <div className="description">
                    <div>
                        <p>{this.props.content}</p>
                    </div>
                </div>
            </div>
        )
    }
}