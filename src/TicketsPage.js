import Ticket from "./components/Ticket";

const TicketsPage = ({ tickets, doAction }) => {
  return (
    <div className="tickets-page">
      <button className="custom-btn" onClick={() => doAction('open', `tickets_form_page null`)}>Create Ticket</button>
      <br/><br/>

      <div className="ticket-list">
        { tickets.map( itemData => <Ticket key={itemData.id} data={ itemData } doAction={doAction}/> ) }
      </div>
    </div>
  )
}

export default TicketsPage