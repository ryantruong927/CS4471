import TicketForm from "./components/TicketForm";

const TicketsFormPage = ({ ticket, doAction, create }) => {

  console.log(ticket)
  return (
    <div className="tickets-form-page">
      <button className="custom-btn" onClick={() => doAction('open', `tickets_page null`)}>Go back</button>
      <TicketForm createTicket={create} cancel={() => doAction('open', `tickets_page null`)}/>
    </div>
  )
}

export default TicketsFormPage