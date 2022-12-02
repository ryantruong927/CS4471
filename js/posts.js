"use strict"

class Posts extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let posts = []

        posts.push(<Post key={0} postTitle="Google Stadia Release Announcement" postDesc="We have released the Google Stadia!" postNum={0} postDate="November 19th, 2019" />)

        for (let i = 1; i < 4; i++)
            posts.push(<Post key={i} postTitle={"Update #" + i} postDesc="This is an update!" postNum={i} postDate={"August 1" + i + "th, 2021"} />)

        posts.push(<Post key={4} postTitle="Google Stadia Will Be Discontinued" postNum={4} postDesc="We regret to announce that Google Stadia will be discontinued on January 18th, 2023." postDate="September 29th, 2022" />)

        return (
            <div id="posts">
                {posts}
            </div>
        )
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowingTickets: false,
            isShowingTicketForm: false
        }
        this.changeTicketsView = this.changeTicketsView.bind(this)
        this.showTicketForm = this.showTicketForm.bind(this)
    }

    changeTicketsView() {
        this.setState({ isShowingTickets: !this.state.isShowingTickets })

        if (this.state.isShowingTicketForm)
            this.setState({ isShowingTicketForm: false })
    }

    showTicketForm() {
        this.setState({ isShowingTicketForm: !this.state.isShowingTicketForm })
    }

    render() {
        let className = this.state.isShowingTickets ? "post-maximized" : "post card"

        let posts = document.getElementsByClassName("post")
        for (let i = 0; i < posts.length; i++) {
            if (this.state.isShowingTickets) {
                if (posts[i].id != this.props.postNum)
                    posts[i].style.display = "none"
            }
            else {
                posts[i].className = "post card"
                posts[i].style.display = "flex"
            }
        }


        let addText = !this.state.isShowingTicketForm ? "Add Ticket" : "Cancel"

        return (
            <div className={className} id={this.props.postNum}>
                <h2>{this.props.postTitle}</h2>
                <div className="tags">
                    <div className="tag">{this.props.postDate}</div>
                    <div className="tag">Product</div>
                    <div className="tag">Update</div>
                </div>
                <p>{this.props.postDesc}</p>
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
                    <TicketForm title={this.props.postTitle} />
                }
                <Tickets isShowingTickets={this.state.isShowingTickets} />
            </div>
        )
    }
}