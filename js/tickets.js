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

// function TicketForm(props) {
//     const [tickets, setTickets] = useState([
//         {
//             id: 0,
//             title: 'Ticket title',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel.',
//             type: 'Bug',
//             upvotes: 100,
//             downvotes: 20,
//             comments: 3
//         },
//         {
//             id: 1,
//             title: 'Ticket title 2',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel.',
//             type: 'UI/UX',
//             upvotes: 5,
//             downvotes: 3,
//             comments: 0
//         }
//     ])

//     const addTicket = (item) => {
//         item = { ...item, id: tickets.length, upvotes: 0, downvotes: 0, comments: 0 }
//         setTickets([...tickets, item])
//     }

//     const sortTickets = (type) => {
//         if (type === 'mu') {
//             tickets.sort((a, b) => b.upvotes - a.upvotes)
//         } else if (type === "lu") {
//             tickets.sort((a, b) => a.upvotes - b.upvotes)
//         } else if (type == "mc") {
//             tickets.sort((a, b) => b.comments - a.comments)
//         } else if (type == "lc") {
//             tickets.sort((a, b) => a.comments - b.comments)
//         } else if (type == "md") {
//             tickets.sort((a, b) => b.downvotes - a.downvotes)
//         } else {
//             tickets.sort((a, b) => a.downvotes - b.downvotes)
//         }

//         setTickets([...tickets])
//     }

//     const sortSelect = <>
//         <label htmlFor="sort-select">Sort by:</label>
//         <select id="sort-select" onChange={e => sortTickets(e.target.value)}>
//             {/*<option value="mr">Most recent</option>*/}
//             {/*<option value="lr">Least recent</option>*/}
//             <option value="mu">Most Upvotes</option>
//             <option value="lu">Least Upvotes</option>
//             <option value="md">Most Downvotes</option>
//             <option value="ld">Least Downvotes</option>
//             <option value="mc">Most Comments</option>
//             <option value="lc">Least Comments</option>
//         </select>
//         <br />
//         <br />
//     </>

//     return (
//         <div className="TicketForm">
//             <h1>Ticket World</h1>
//             <ul>
//                 <li>Option filter tickets by ticket type</li>
//             </ul>
//             <hr />
//             <h2>Ticket Form</h2>
//             <TicketForm createTicket={addTicket} />
//             <hr />
//             <div className="ticket-list">
//                 {sortSelect}
//                 {tickets.map(itemData => <Ticket key={itemData.id} data={itemData} />)}
//             </div>
//             <hr />
//             <h2>Comments</h2>
//             <CommentSpace />
//         </div>
//     )
// }

// const TicketForm = ({ createTicket }) => {

//     const [title, setTitle] = useState("")
//     const [type, setType] = useState("Feature")
//     const [description, setDescription] = useState("")

//     const titleField = <div className="field">
//         <label htmlFor="ticket-title">Ticket Title</label>
//         <p>Add a short, descriptive headline</p>
//         <input
//             type="text" id="ticket-title" autoComplete="off"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//         />
//     </div>

//     const types = ["Feature", "UI/UX", "Enhancement", "Bug"]
//     const typeField = <div className="field">
//         <label htmlFor="ticket-type">Category</label>
//         <p>Choose a category for your feedback</p>
//         <select id="ticket-type" value={type} onChange={e => setType(e.target.value)}>
//             {types.map(i => <option key={i} value={i}>{i}</option>)}
//         </select>
//     </div>

//     const descriptionField = <div className="field">
//         <label htmlFor="ticket-description">Ticket Description</label>
//         <p>Include any specific comments on what should be improved, added, etc.</p>
//         <textarea
//             id="ticket-description" rows={3}
//             value={description} onChange={e => setDescription(e.target.value)}
//         ></textarea>
//     </div>

//     const buttons = <div className="buttons">
//         <button className="custom-btn purple" onClick={() => {
//             if (title === '' || description === '' || type === '') return
//             createTicket({ title: title, description: description, type: type })
//             setTitle("")
//             setDescription("")
//             setType("Feature")
//         }}>Add Feedback</button>
//         <button className="custom-btn dark">Cancel</button>
//     </div>
// }

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
                    type="text" className="pill" id="ticket-title" autoComplete="off"
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
                    value={this.state.description} onChange={e => this.setDescription(e.target.value)}
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