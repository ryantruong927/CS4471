import './App.css';
import { useState } from "react";
import TicketsPage from "./TicketsPage";
import TicketsFormPage from "./TicketsFormPage";
import TicketsPageSingle from "./TicketsPageSingle";

function App() {

  const [ currentPage, setCurrentPage ] = useState("tickets_page")
  const [ selectedTicket, setSelectedTicket ] = useState(null)
  const [ tickets, setTickets ] = useState([
    {
      id: 0,
      title: 'Ticket title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel.',
      type: 'Bug',
      upvotes: 100,
      downvotes: 20,
      comments: 3
    },
    {
      id: 1,
      title: 'Ticket title 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel.',
      type: 'UI/UX',
      upvotes: 5,
      downvotes: 3,
      comments: 0
    }
  ])

  const doAction = (action, target) => {
    if (action === 'upvote' || action === 'downvote'){
      for ( let ticket of tickets ) {
        if ( ticket.id === target ) {
          if ( action === 'upvote' ) {
            ticket.upvotes += 1
          } else {
            ticket.downvotes += 1
          }
          break;
        }
      }

    } else if (action === 'create_ticket') {
      let item = { ...target, id: tickets.length, upvotes: 0, downvotes: 0, comments: 0 }
      tickets.push(item)
      setCurrentPage("tickets_page")
      setSelectedTicket(null)

    } else if (action === 'update_ticket') {
      tickets[target[0]] = { ...tickets[target[0]], ...target[1] }

      setCurrentPage("tickets_page")
      setSelectedTicket(null)

    } else if (action === 'open'){
      let direction = target.split(' ')
      setCurrentPage(direction[0])
      if ( direction[0] === 'null' ){
        setSelectedTicket(null)
      } else {
        setSelectedTicket(parseInt(direction[1]))
      }

    } else if (action === 'sort') {
      console.log('sorting in progress...')
    } else if (action === 'edit') {
      setSelectedTicket(target)
      setCurrentPage('tickets_form_page')

    } else {
      console.log('Action not found...')
      return
    }

    setTickets([ ...tickets ])
  }

  let html
  if ( currentPage === 'tickets_page' ){
    html = <TicketsPage
      tickets={tickets}
      doAction={doAction}
    />
  } else if ( currentPage === 'tickets_form_page' ){
    html = <TicketsFormPage
      ticket={ selectedTicket !== null ? tickets[selectedTicket] : null }
      doAction={doAction}
    />
  } else if ( currentPage === 'tickets_page_single' ){
    html = <TicketsPageSingle
      ticket={tickets[selectedTicket]}
      doAction={doAction}
    />
  } else {
    html = <h3>Page not found...</h3>
  }

  return (
    <div className="App">
      <h1>Ticket World</h1>
      <ul>
        <li>TO DO? Option filter tickets by ticket type</li>
        <li>Sort</li>
      </ul>
      <hr/>
      { html }
    </div>
  );
}

export default App;
