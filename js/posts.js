"use strict"

function Posts(props) {
    let posts = []
    for (let i = 0; i < 3; i++)
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
        this.showTickets = this.showTickets.bind(this)
    }

    showTickets() {
        this.setState({ isShowingTickets: !this.state.isShowingTickets })
    }

    render() {
        return (
            <div className="post card">
                <h2>Update #{this.props.postNum}</h2>
                <div className="tags">
                    <div className="tag">January 1st, 2023</div>
                    <div className="tag">Product</div>
                    <div className="tag">Update</div>
                </div>
                <p>This is an update.</p>
                <button className="more" onClick={this.showTickets}>
                    <i className="fa-solid fa-ellipsis fa-3x moreicon"></i>
                </button>
                <Tickets isShowingTickets={this.state.isShowingTickets} />
            </div>
        )
    }
}