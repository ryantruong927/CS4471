"use strict"

function Posts(props) {
    let posts = []
    let results = []
    let create = <button className="companybtn pill" onClick={() => props.onClick("createpost")}><p>Create Post</p></button>

    axios.post('http://localhost:4000/posts', { CompanyID: props.id }).then((response) => {
        results = response.data
        console.log(results)
    });
    // axios.post('http://localhost:4000/tickets', { CompanyID: props.id, PostID: post.id }).then((response) => {
    //     results = response.data
    //     console.log(results)
    // });

    for (let i = 1; i < results.length; i++){
        posts.push(<Post key={posts[i][1]} title={posts[i][2]} description={posts[i][3]} id={i} date={posts[i][4]} companyID={props.id}/>)
    }

    // posts.push(<Post key={0} title="Google Stadia Release Announcement" description="We have released the Google Stadia!" id={11} date="November 19th, 2019" companyID={props.id}/>)
    // for (let i = 1; i < 4; i++)
    //     posts.push(<Post key={i} title={"Update #" + i} description="This is an update!" id={i} date={"August 1" + i + "th, 2021"} />)
    //
    // posts.push(<Post key={4} title="Google Stadia Will Be Discontinued" id={4} description="We regret to announce that Google Stadia will be discontinued on January 18th, 2023." date="September 29th, 2022" />)

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
                    tags: ["Bug", "Not In Progress"],
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
                    tags: ["Bug", "Completed"],
                    upvotes: 235,
                    downvotes: 4,
                }
            ],
            isShowingTicketForm: false,
            isShowingTickets: false
        }
        this.state.tickets = this.state.tickets.sort(
            (a, b) => { return (a.upvotes - a.downvotes) - (b.upvotes - b.downvotes) || a.id - b.id }
        )
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
        ticket.companyID = this.props.companyID
        ticket.postID = this.props.id
        axios.post('http://localhost:4000/new_ticket', ticket).then((response) => {
            console.log(response);
        })
        this.showTicketForm()
        this.forceUpdate()
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
                <p>{this.state.description}</p>
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
                    <TicketForm
                        title=""
                        description=""
                        tags={["", "Not In Progress"]}
                        onClick={this.addTicket}
                    />
                }
                <div id="tickets">
                    {
                        this.state.isShowingTickets &&
                        this.state.tickets.map(
                            ticket => <Ticket
                                key={ticket.id}
                                id={ticket.id}
                                title={ticket.title}
                                description={ticket.description}
                                name={ticket.name}
                                username={ticket.username}
                                date={ticket.date}
                                tags={ticket.tags}
                                upvotes={ticket.upvotes}
                                downvotes={ticket.downvotes}
                                onClick={this.showTicketForm}
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
                        if (this.state.title === '' || this.state.description === '' || this.state.type === '')
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