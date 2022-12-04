"use strict"

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            name: this.props.name,
            username: this.props.username,
            date: this.props.date,
            upvotes: this.props.upvotes,
            downvotes: this.props.downvotes,
            description: this.props.description
        }
        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
    }

    upvote() {
        this.setState({ upvotes: this.state.upvotes + 1 })
    }

    downvote() {
        this.setState({ downvotes: this.state.downvotes + 1 })
    }

    render() {
        return (
            <div className="ticket-comment">
                <div className="col">
                    <div className="votes">
                        <div className="voting-btn upvote" onClick={this.upvote}>
                            <span>▲</span>
                            <span>{this.state.upvotes}</span>
                        </div>
                        <div className="voting-btn downvote" onClick={this.downvote}>
                            <span>▼</span>
                            <span>{this.state.downvotes}</span>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="description">
                        <div>
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                    <span className="ticket-author">by {this.state.name} (@{this.state.username}) on {this.state.date}</span>
                </div>
            </div>
        )
    }
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: ""
        }
        this.setDescription = this.setDescription.bind(this)
    }

    setDescription(description) {
        this.setState({ description: description })
    }

    render() {
        return (
            <div className="post-comment">
                <textarea
                    placeholder="Add a comment" maxLength={550} rows={3}
                    value={this.state.description} onChange={e => this.setDescription(e.target.value)}
                ></textarea>
                <div>
                    <span>{550 - this.state.description.length} characters left</span>
                    <button
                        className="comment-btn pill"
                        onClick={() => {
                            if (this.state.description === '')
                                return
                            let comment = {
                                id: 0,
                                name: "Ryan Truong",
                                username: "ryantruong927",
                                date: "03/12/22",
                                upvotes: 0,
                                downvotes: 0,
                                description: this.state.description
                            }
                            this.props.onClick(comment)
                            this.setDescription("")
                        }
                        }
                        disabled={this.state.description.length == 0}
                    >Post Comment</button>
                </div>
            </div>
        )
    }
}