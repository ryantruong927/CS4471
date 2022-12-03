"use strict"

function Posts(props) {
    let posts = []
    let create = <button className="companybtn pill" onClick={() => props.onClick("createpost")}><p>Create Post</p></button>

    posts.push(<Post key={0} title="Google Stadia Release Announcement" desc="We have released the Google Stadia!" id={0} date="November 19th, 2019" />)

    for (let i = 1; i < 4; i++)
        posts.push(<Post key={i} title={"Update #" + i} desc="This is an update!" id={i} date={"August 1" + i + "th, 2021"} />)

    posts.push(<Post key={4} title="Google Stadia Will Be Discontinued" id={4} desc="We regret to announce that Google Stadia will be discontinued on January 18th, 2023." date="September 29th, 2022" />)

    return (
        <div >
            <div id="posts">
                <div style={{ display: "inline" }}>
                    <p>Filter by tag(s):</p>
                    <input className="pill"></input>
                    <div id="post-btn">
                        {create}
                    </div>
                </div>
                {posts}
            </div>
        </div>
    )
}

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,
            date: props.date,
            tags: props.tags,
            tickets: [
                {
                    id: 0,
                    title: "Huge Bug",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel.",
                    name: "Ryan Truong",
                    username: "ryantruong927",
                    date: "10/11/2022",
                    tag: "Bug",
                    upvotes: 10,
                    downvotes: 250,
                },
                {
                    id: 1,
                    title: "Little Bug",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel.",
                    name: "Brian Wrong",
                    username: "ryantruong927",
                    date: "10/11/2022",
                    tag: "Bug",
                    upvotes: 235,
                    downvotes: 4,
                }
            ],
            isShowingTicketForm: false,
            isShowingTickets: false
        }
        this.changeTicketsView = this.changeTicketsView.bind(this)
        this.showTicketForm = this.showTicketForm.bind(this)
        this.addTicket = this.addTicket.bind(this)
    }

    changeTicketsView() {
        this.setState({ isShowingTickets: !this.state.isShowingTickets })

        if (this.state.isShowingTicketForm)
            this.setState({ isShowingTicketForm: false })

        let posts = document.getElementsByClassName("post")
        for (let i = 0; i < posts.length; i++) {
            if (!this.state.isShowingTickets) {
                if (posts[i].id != ("p" + this.state.id))
                    posts[i].style.display = "none"
            }
            else {
                posts[i].className = "post card"
                posts[i].style.display = "flex"
            }
        }
    }

    showTicketForm() {
        this.setState({ isShowingTicketForm: !this.state.isShowingTicketForm })
    }

    addTicket(ticket) {
        ticket.id = this.state.tickets.length
        this.state.tickets.push(ticket)
        this.showTicketForm()
    }

    render() {
        let className = this.state.isShowingTickets ? "post-maximized" : "post card"
        let id = "p" + this.state.id
        let addText = !this.state.isShowingTicketForm ? "Add Ticket" : "Cancel"

        return (
            <div className={className} id={id}>
                <h2>{this.state.title}</h2>
                <div className="tags">
                    <div className="tag">{this.state.date}</div>
                    <div className="tag">Product</div>
                    <div className="tag">Update</div>
                </div>
                <p>{this.state.desc}</p>
                <div id="post-nav">
                    {
                        this.state.isShowingTickets &&
                        <button className="pill" onClick={this.showTicketForm}>
                            {addText}
                        </button>
                    }
                    <button className="more" onClick={this.changeTicketsView}>
                        <i className="fa-solid fa-ellipsis fa-3x moreicon"></i>
                    </button>
                </div>
                {
                    this.state.isShowingTicketForm &&
                    <TicketForm onClick={this.addTicket} />
                }
                <div id="tickets">
                    {
                        this.state.isShowingTickets &&
                        this.state.tickets.map(
                            ticket => <Ticket
                                key={ticket.id}
                                id={ticket.id}
                                title={ticket.title}
                                content={ticket.content}
                                name={ticket.name}
                                username={ticket.username}
                                date={ticket.date}
                                tag={ticket.tag}
                                upvotes={ticket.upvotes}
                                downvotes={ticket.downvotes}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            tag: "Bug"
        }
        this.setTitle = this.setTitle.bind(this)
        this.setTag = this.setTag.bind(this)
        this.setDescription = this.setDescription.bind(this)
    }

    setTitle(title) {
        this.setState({ title: title });
    }

    setTag(tag) {
        this.setState({ tag: tag });
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
                        type="text" className="pill" id="ticket-tag" placeholder="Add a title" autoComplete="off"
                        value={this.state.tag}
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
                    <button className="custom-btn purple pill" id="feedback-btn" onClick={() => {
                        if (this.state.title === '' || this.state.description === '' || this.state.type === '')
                            return
                        let ticket = {
                            id: 0,
                            title: this.state.title,
                            description: this.state.description,
                            name: "Ryan Truong",
                            username: "ryantruong927",
                            date: "03/12/22",
                            tag: this.state.tag,
                            upvotes: 0,
                            downvotes: 0
                        }
                        this.props.onClick(ticket)
                    }}>Add Feedback</button>
                </div>
            </div>
        )
    }
}