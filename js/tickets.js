"use strict"

function Tickets(props) {
    if (props.isShowingTickets) {
        let tickets = []
        for (let i = 0; i < 3; i++)
            tickets.push(<Ticket key={i} ticketNum={i + 1} />)

        return (
            <div id="tickets">
                {tickets}
            </div>
        )
    }
}

class Ticket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,
            name: props.name,
            username: props.username,
            date: props.date,
            tags: props.tags,
            upvotes: props.upvotes,
            downvotes: props.downvotes,
            comments: [
                {
                    id: 0,
                    name: "Ryan Truong",
                    username: "ryantruong927",
                    date: "05/12/11",
                    upvotes: 2000,
                    downvotes: 0,
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel."
                },
                {
                    id: 1,
                    name: "Brian Wrong",
                    username: "ryantruong927",
                    date: "05/12/11",
                    upvotes: 340,
                    downvotes: 0,
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel."
                }
            ],
            isShowingComments: false
        }
        this.state.comments = this.state.comments.sort(
            (a, b) => { return (a.upvotes - a.downvotes) - (b.upvotes - b.downvotes) || a.id - b.id }
        )
        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
        this.changeCommentsView = this.changeCommentsView.bind(this)
        this.addComment = this.addComment.bind(this)
    }

    upvote() {
        this.setState({ upvotes: this.state.upvotes + 1 })
    }

    downvote() {
        this.setState({ downvotes: this.state.downvotes + 1 })
    }

    changeCommentsView() {
        this.setState({ isShowingComments: !this.state.isShowingComments })

        let tickets = document.getElementsByClassName("ticket-container")
        for (let i = 0; i < tickets.length; i++) {
            if (!this.state.isShowingComments) {
                if (tickets[i].id != ("t" + this.state.id))
                    tickets[i].style.display = "none"
            }
            else {
                tickets[i].style.display = "flex"
            }
        }
    }

    addComment(comment) {
        comment.id = this.state.comments.length
        this.state.comments.push(comment)
        this.forceUpdate()
    }

    render() {
        let id = "t" + this.state.id
        return (
            <div className="ticket-container" id={id}>
                <div className="ticket">
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
                        <div className="ticket-body">
                            <h3 style={{ marginBottom: 0 }}>{this.state.title}</h3>
                            <span className="ticket-author">
                                by {this.state.name} (@{this.state.username}) on {this.state.date}</span>
                            <p>{this.state.description}</p>
                            <div>
                                <div className="tag">
                                    {this.state.tags[0]}
                                </div>
                                <div className="tag">
                                    {this.state.tags[1]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ticket-nav">
                    <h3>Comments ({this.state.comments.length})</h3>
                    <button className="more" onClick={this.changeCommentsView}>
                        <i className="fa-solid fa-ellipsis fa-3x moreicon"></i>
                    </button>
                </div>
                {
                    this.state.isShowingComments &&
                    <div>
                        <CommentForm onClick={this.addComment} />
                        <div className="comments">
                            {
                                this.state.comments.map(
                                    comment => <Comment
                                        key={comment.id}
                                        id={comment.id}
                                        name={comment.name}
                                        username={comment.username}
                                        date={comment.date}
                                        upvotes={comment.upvotes}
                                        downvotes={comment.downvotes}
                                        description={comment.description}
                                    />
                                )
                            }
                        </div>
                    </div>
                }
            </div >
        )
    }
}

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