import Ticket from "./components/Ticket";

const TicketsPage = ({ tickets, doAction }) => {



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
    <div className="tickets-page">
      <div className="ticket-list">
        { sortSelect }
        { tickets.map( itemData => <Ticket key={itemData.id} data={ itemData } doAction={doAction}/> ) }
      </div>
    </div>
  )
}

export default TicketsPage