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
                    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel.",
                    name: "Ryan Truong",
                    username: "ryantruong927",
                    date: "10/11/2022",
                    upvotes: 10,
                    downvotes: 250,
                },
                {
                    id: 1,
                    title: "Little Bug",
                    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel.",
                    name: "Brian Wrong",
                    username: "ryantruong927",
                    date: "10/11/2022",
                    upvotes: 235,
                    downvotes: 4,
                }
            ],
            isShowingTicketForm: false,
            isShowingTickets: false
        }
        this.changeTicketsView = this.changeTicketsView.bind(this)
        this.showTicketForm = this.showTicketForm.bind(this)
    }

    changeTicketsView() {
        this.setState({ isShowingTickets: !this.state.isShowingTickets })

        if (this.state.isShowingTicketForm)
            this.setState({ isShowingTicketForm: false })

        let posts = document.getElementsByClassName("post")
        for (let i = 0; i < posts.length; i++) {
            console.log(posts[i].id)
            console.log("p" + this.state.id)
            console.log(posts[i].id != ("p" + this.state.id))
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
                    <TicketForm title={this.props.title} />
                }
                <div id="tickets">
                    {
                        this.state.isShowingTickets &&
                        this.state.tickets.map(
                            ticket => <Ticket key={ticket.id} id={ticket.id} title={ticket.title} content={ticket.content} name={ticket.name} username={ticket.username} date={ticket.date} upvotes={ticket.upvotes} downvotes={ticket.downvotes} />
                        )
                    }
                </div>
            </div>
        )
    }
}