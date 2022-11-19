import './App.css';
import Ticket from "./components/Ticket";
import TicketForm from "./components/TicketForm";
import { useState } from "react";

function App() {

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

  const addTicket = (item) => {
    item = { ...item, id: tickets.length, upvotes: 0, downvotes: 0, comments: 0 }
    setTickets([ ...tickets, item ])
  }

  const sortTickets = (type) => {
    if ( type === 'mu' ) {
      tickets.sort( (a, b) => b.upvotes - a.upvotes )
    } else if ( type === "lu" ){
      tickets.sort( (a, b) => a.upvotes - b.upvotes )
    } else if ( type == "mc" ){
      tickets.sort( (a, b) => b.comments - a.comments )
    } else if ( type == "lc" ){
      tickets.sort( (a, b) => a.comments - b.comments )
    } else if ( type == "md" ){
      tickets.sort( (a, b) => b.downvotes - a.downvotes )
    } else {
      tickets.sort( (a, b) => a.downvotes - b.downvotes )
    }

    setTickets([ ...tickets ])
  }

  const sortSelect = <>
    <label htmlFor="sort-select">Sort by:</label>
    <select id="sort-select" onChange={ e => sortTickets(e.target.value) }>
      {/*<option value="mr">Most recent</option>*/}
      {/*<option value="lr">Least recent</option>*/}
      <option value="mu">Most Upvotes</option>
      <option value="lu">Least Upvotes</option>
      <option value="md">Most Downvotes</option>
      <option value="ld">Least Downvotes</option>
      <option value="mc">Most Comments</option>
      <option value="lc">Least Comments</option>
    </select>
    <br/>
    <br/>
  </>

  return (
    <div className="App">
      <h1>Ticket World</h1>
      <ul>
        <li>Option filter tickets by ticket type</li>
      </ul>
      <TicketForm createTicket={addTicket}/>
      <hr/>
      <div className="ticket-list">
        { sortSelect }
        { tickets.map( itemData => <Ticket key={itemData.id} data={ itemData }/> ) }
      </div>
    </div>
  );
}

export default App;
