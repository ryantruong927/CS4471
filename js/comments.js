"use strict"

function Comments(props) {
    return (
        <div id="comments">
            <Comment />
            <Comment />
            <Comment />
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
                Ryan <br></br>
                This post sucks.
            </div>
        )
    }
}