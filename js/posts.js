"use strict"

function Posts(props) {
    let posts = []
    for (let i = 0; i < 10; i++)
        posts.push(<Post key={i} postNum={i + 1} />)

    return (
        <div id="posts">
            {posts}
        </div>
    )
}

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isShowingTickets: false }
        this.changeTicketsView = this.changeTicketsView.bind(this)
    }

    changeTicketsView() {
        this.setState({ isShowingTickets: !this.state.isShowingTickets })
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

        return (
            <div className={className} id={this.props.postNum}>
                <h2>Update #{this.props.postNum}</h2>
                <div className="tags">
                    <div className="tag">January 1st, 2023</div>
                    <div className="tag">Product</div>
                    <div className="tag">Update</div>
                </div>
                <p>This is an update.</p>
                <button className="more" onClick={this.changeTicketsView}>
                    <i className="fa-solid fa-ellipsis fa-3x moreicon"></i>
                </button>
                <Tickets isShowingTickets={this.state.isShowingTickets} />
            </div>
        )
    }
}