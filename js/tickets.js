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
            tag: props.tag,
            upvotes: props.upvotes,
            downvotes: props.downvotes,
            comments: [
                {
                    id: 0,
                    name: "Ryan Truong",
                    username: "ryantruong927",
                    date: "05/12/11",
                    upvotes: 0,
                    downvotes: 0,
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel."
                },
                {
                    id: 1,
                    name: "Brian Wrong",
                    username: "ryantruong927",
                    date: "05/12/11",
                    upvotes: 0,
                    downvotes: 0,
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel."
                }
            ],
            isShowingComments: false
        }
        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
        this.changeCommentsView = this.changeCommentsView.bind(this)
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

    addComment() {

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
                            <span className="ticket-author">by {this.state.name} (@{this.state.username}) on {this.state.date}</span>
                            <p>{this.state.description}</p>
                            <div className="ticket-type">{this.state.tag}</div>
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
                    this.state.comments.map(
                        comment => <Comment
                            key={comment.id}
                            name={comment.name}
                            username={comment.username}
                            date={comment.date}
                            upvotes={comment.upvotes}
                            downvotes={comment.downvotes}
                            description={comment.description}
                        />
                    )
                }
            </div >
        )
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            upvotes: this.props.upvotes,
            downvotes: this.props.downvotes
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
                            <p>{this.props.description}</p>
                        </div>
                    </div>
                    <span className="ticket-author">by {this.props.name} (@{this.props.username}) on {this.props.date}</span>
                </div>
            </div>
        )
    }
}