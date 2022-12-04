"use strict"

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
            isShowingComments: false,
            isEditingTicket: false
        }
        this.state.comments = this.state.comments.sort(
            (a, b) => { return (a.upvotes - a.downvotes) - (b.upvotes - b.downvotes) || a.id - b.id }
        )
        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
        this.showTicketForm = this.showTicketForm.bind(this)
        this.editTicket = this.editTicket.bind(this)
        this.changeCommentsView = this.changeCommentsView.bind(this)
        this.addComment = this.addComment.bind(this)
    }

    upvote() {
        this.setState({ upvotes: this.state.upvotes + 1 })
    }

    downvote() {
        this.setState({ downvotes: this.state.downvotes + 1 })
    }

    showTicketForm() {
        this.setState({ isEditingTicket: !this.state.isEditingTicket })
    }

    editTicket(ticket) {
        this.setState({ title: ticket.title })
        this.setState({ description: ticket.description })
        this.setState({ tags: ticket.tags })
        this.setState({ isEditingTicket: !this.state.isEditingTicket })
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
        this.setState({ comments: [...this.state.comments, comment] })
    }

    render() {
        let id = "t" + this.state.id
        if (this.state.isEditingTicket)
            return (
                <TicketForm
                    title={this.state.title}
                    description={this.state.description}
                    tags={this.state.tags}
                    onClick={this.editTicket}
                />
            )
        else {
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
                        <div>
                            {
                                this.state.isShowingComments &&
                                <button className="pill" onClick={this.showTicketForm}>
                                    Edit Ticket
                                </button>
                            }
                            <button className="more" onClick={this.changeCommentsView}>
                                <i className="fa-solid fa-ellipsis fa-3x moreicon"></i>
                            </button>
                        </div>
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
}

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            description: this.props.description,
            tags: this.props.tags
        }
        this.setTitle = this.setTitle.bind(this)
        this.setTag = this.setTag.bind(this)
        this.setDescription = this.setDescription.bind(this)
    }

    setTitle(title) {
        this.setState({ title: title });
    }

    setTag(tag) {
        let tags = this.state.tags
        tags[0] = tag
        this.setState({ tags: tags })
    }

    setDescription(description) {
        this.setState({ description: description });
    }

    render() {
        return (
            <div className="card" id="ticket-form">
                <div className="field">
                    <label htmlFor="ticket-title">Ticket Title</label>
                    <p>Add a short, descriptive headline</p>
                    <input
                        type="text" className="pill" id="ticket-title" placeholder="Add a title" autoComplete="off"
                        value={this.state.title}
                        onChange={e => this.setTitle(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="ticket-type">Tag</label>
                    <p>Add a tag to help identify the type of ticket</p>
                    <input
                        type="text" className="pill" id="ticket-tag" placeholder="Add a tag (ex. Bug, Issue, Suggestion, etc.)" autoComplete="off"
                        value={this.state.tags[0]}
                        onChange={e => this.setTag(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="ticket-description">Ticket Description</label>
                    <p>Include any specific comments on what should be improved, added, etc.</p>
                    <textarea
                        className="pill"
                        id="ticket-description" rows={3}
                        value={this.state.description} placeholder="Add a description" onChange={e => this.setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="buttons">
                    <button className="custom-btn pill" id="feedback-btn" onClick={() => {
                        if (this.state.title === '' || this.state.description === '' || this.state.tags[0] === '')
                            return
                        let ticket = {
                            id: 0,
                            title: this.state.title,
                            description: this.state.description,
                            name: "Ryan Truong",
                            username: "ryantruong927",
                            date: "03/12/22",
                            tags: this.state.tags,
                            upvotes: 0,
                            downvotes: 0
                        }
                        this.props.onClick(ticket)
                    }
                    }
                    >Add Feedback</button>
                </div>
            </div >
        )
    }
}