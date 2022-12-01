import TicketForm from "./components/TicketForm";

const TicketsFormPage = ({ doAction, create }) => {

  return (
    <div className="tickets-form-page">
      <button className="custom-btn" onClick={() => doAction('open', `tickets_page null`)}>Go back</button>
      <TicketForm createTicket={create}/>
    </div>
  )
}

export default TicketsFormPage