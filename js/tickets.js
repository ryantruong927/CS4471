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
            upvotes: 0,
            downvotes: 0,
            isShowingComments: false,
            comments: [
                {
                    id: 1,
                    name: "Ryan Truong",
                    username: "ryantruong927",
                    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel."
                }
            ]
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

    addComment() {

    }

    render() {
        return (
            <div id="ticket-container">
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
                            <h3>Ticket #{this.props.ticketNum}</h3>
                            <p>The site is not quite finished yet.</p>
                            <div className="ticket-type">Type</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="comment-number">
                            <span>📥</span>
                            <span>{this.state.comments.length}</span>
                        </div>
                    </div>
                </div>
                {this.state.comments.map(comment => <Comment key={comment.id} name={comment.name} username={comment.username} content={comment.content} />)}
            </div>
        )
    }
}

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="card" id="ticket-form">
                <TitleField title={this.props.postTitle} />
                <TypeField />
                <DescriptionField description="" />
                <Buttons />
            </div>
        )
    }

}

class TitleField extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: "" }
        this.setTitle = this.setTitle.bind(this)
    }

    setTitle(title) {
        this.setState({ title: title });
    }

    render() {
        return (
            <div className="field">
                <label htmlFor="ticket-title">Ticket Title</label>
                <p>Add a short, descriptive headline</p>
                <input
                    type="text" className="pill" id="ticket-title" placeholder="Add a title" autoComplete="off"
                    value={this.props.title}
                    onChange={e => this.setTitle(e.target.value)}
                />
            </div>
        )
    }

}

class TypeField extends React.Component {
    constructor(props) {
        super(props)
        this.state = { type: "Feature" }
        this.setType = this.setType.bind(this)
    }

    setType(type) {
        this.setState({ type: type });
    }

    render() {
        const types = ["Feature", "UI/UX", "Enhancement", "Bug"]

        return (
            <div className="field">
                <label htmlFor="ticket-type">Category</label>
                <p>Choose a category for your feedback</p>
                <select id="ticket-type" value={this.state.description} onChange={e => this.setType(e.target.value)}>
                    {types.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>
        )
    }

}

class DescriptionField extends React.Component {
    constructor(props) {
        super(props)
        this.state = { description: "" }
        this.setDescription = this.setDescription.bind(this)
    }

    setDescription(description) {
        this.setState({ description: description });
    }

    render() {
        return (
            <div className="field">
                <label htmlFor="ticket-description">Ticket Description</label>
                <p>Include any specific comments on what should be improved, added, etc.</p>
                <textarea
                    className="pill"
                    id="ticket-description" rows={3}
                    value={this.state.description} placeholder="Add a description" onChange={e => this.setDescription(e.target.value)}
                ></textarea>
            </div>
        )
    }

}

function Buttons(props) {
    return (
        <div className="buttons">
            <button className="custom-btn purple pill" id="feedback-btn" onClick={() => {
                if (title === '' || description === '' || type === '') return
                createTicket({ title: title, description: description, type: type })
                setTitle("")
                setDescription("")
                setType("Feature")
            }}>Add Feedback</button>
        </div>
    )
}

function TicketsFormPage(props) {
    return (
        <div className="tickets-form-page">
            <button className="custom-btn" onClick={() => doAction('open', `tickets_page null`)}>Go back</button>
            <TicketForm createTicket={create} />
        </div>
    )
}