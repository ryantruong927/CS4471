"use strict"

function Tickets(props) {
    if (props.isShowingTickets) {
        let tickets = []
        for (let i = 0; i < 3; i++)
            tickets.push(<Ticket key={i} ticketNum={i + 1} />)

        return (
            <div className="tickets">
                {tickets}
            </div>
        )
    }
}

class Ticket extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="ticket card">
                <h2>Ticket #{this.props.ticketNum}</h2>
                <p>The site is not quite finished yet.</p>
                <Comments />
            </div>
        )
    }
}