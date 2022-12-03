"use strict"

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
                        <p>{this.props.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}