"use strict"

class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: props.posts,
            isCreatingPost: false
        }
        this.setPosts = this.setPosts.bind(this)
        this.showPostForm = this.showPostForm.bind(this)
        this.createPost = this.createPost.bind(this)
    }

    setPosts(posts) {
        this.setState({ posts: posts })
    }

    showPostForm() {
        this.setState({ isCreatingPost: !this.state.isCreatingPost })
    }


    createPost(post) {
        post.companyId = this.state.posts[0].companyId
        axios.post('http://localhost:4000/new_post', {
            name: post.name,
            description: post.description,
            tags: post.tags
        }).then((response) => {
            console.log(response);
        })
        // axios.post('http://localhost:4000/tickets', { CompanyID: props.id, PostID: post.id }).then((response) => {
        //     results = response.data
        //     console.log(results)
        // });
        this.setState({ posts: [...this.state.posts, post] })
        this.setState({ isCreatingPost: !this.state.isCreatingPost })
    }

    render() {
        let addText = !this.state.isCreatingPost ? "Add Post" : "Cancel"

        return (
            <div >
                <div id="posts">
                    <div id="post-btn">
                        <button className="companybtn pill" onClick={this.showPostForm}>{addText}</button>
                    </div>
                    {
                        this.state.isCreatingPost &&
                        <PostForm
                            title=""
                            description=""
                            tag=""
                            onClick={this.createPost}
                        />
                    }
                    {
                        this.state.posts.map(
                            post => <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                description={post.description}
                                date={post.date}
                                tag={post.tag}
                                tickets={[{
                                    id: 0,
                                    title: "Good Ticket",
                                    name: "Ryan Truong",
                                    username: "ryantruong927",
                                    date: "05/12/11",
                                    tags: ["Bug", "Completed"],
                                    upvotes: 3453,
                                    downvotes: 33,
                                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel."
                                },
                                {
                                    id: 1,
                                    title: "Bad Ticket",
                                    name: "Brian Wrong",
                                    username: "ryantruong927",
                                    date: "05/12/11",
                                    tags: ["Issue", "Rejected"],
                                    upvotes: 98,
                                    downvotes: 3454,
                                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel."
                                }]}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyId: props.companyId,
            id: props.id,
            title: props.title,
            description: props.description,
            date: props.date,
            tags: props.tags,
            tickets: props.tickets,
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
        ticket.postID = this.props.id
        axios.post('http://localhost:4000/new_ticket', ticket).then((response) => {
            console.log(response);
        })
        this.setState({ tickets: [...this.state.tickets, ticket] })
        this.showTicketForm()
        this.forceUpdate()
    }

    render() {
        let className = this.state.isShowingTickets ? "post-maximized" : "post card"
        let id = "p" + this.state.id
        let addText = !this.state.isShowingTicketForm ? "Add Ticket" : "Cancel"

        console.log(this.state.tickets)
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

class PostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            description: this.props.description,
            tag: this.props.tag
        }
        this.setTitle = this.setTitle.bind(this)
        this.setTag = this.setTag.bind(this)
        this.setDescription = this.setDescription.bind(this)
    }

    setTitle(title) {
        this.setState({ title: title });
    }

    setTag(tag) {
        this.setState({ tag: tag })
    }

    setDescription(description) {
        this.setState({ description: description });
    }

    render() {
        return (
            <div className="card" id="ticket-form">
                <div className="field">
                    <label htmlFor="ticket-title">Post Title</label>
                    <p>Add a short, descriptive headline</p>
                    <input
                        type="text" className="pill" id="ticket-title" placeholder="Add a title" autoComplete="off"
                        value={this.state.title}
                        onChange={e => this.setTitle(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="ticket-type">Tag</label>
                    <p>Add a tag to help identify the type of post</p>
                    <input
                        type="text" className="pill" id="ticket-tag" placeholder="Add a tag (ex. Release, Announcement, Update, etc.)" autoComplete="off"
                        value={this.state.tag}
                        onChange={e => this.setTag(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="ticket-description">Post Description</label>
                    <p>Describe the content.</p>
                    <textarea
                        className="pill"
                        id="ticket-description" rows={3}
                        value={this.state.description} placeholder="Add a description" onChange={e => this.setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="buttons">
                    <button className="custom-btn pill" id="feedback-btn" onClick={() => {
                        if (this.state.title === '' || this.state.description === '' || this.state.tag === '')
                            return
                        let post = {
                            companyId: 0,
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
                        this.props.onClick(post)
                    }
                    }
                    >Add Post</button>
                </div>
            </div >
        )
    }
}