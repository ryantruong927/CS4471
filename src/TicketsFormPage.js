import { useState } from "react";

const TicketsFormPage = ({ ticket, doAction }) => {

  const [ title, setTitle ] = useState(ticket !== undefined ? ticket.title : "")
  const [ type, setType ] = useState(ticket !== undefined ? ticket.type : "Feature")
  const [ description, setDescription ] = useState(ticket !== undefined ? ticket.description : "")

  // Change form text between creating a new ticket and editing one
  const header = ticket === undefined ? 'Create ticket' : 'Edit ticket'
  const btnText = ticket === undefined ? 'Add ticket' : 'Update ticket'

  const titleField = <div className="field">
    <label htmlFor="ticket-title">Ticket Title</label>
    <p>Add a short, descriptive headline</p>
    <input
      type="text" id="ticket-title" autoComplete="off"
      value={ title }
      onChange={ e => setTitle(e.target.value) }
    />
  </div>

  const types =  [ "Feature", "UI/UX", "Enhancement", "Bug" ]
  const typeField = <div className="field">
    <label htmlFor="ticket-type">Category</label>
    <p>Choose a category for your ticket</p>
    <select id="ticket-type" value={ type } onChange={ e => setType(e.target.value) }>
      { types.map( i => <option key={i} value={i}>{i}</option> ) }
    </select>
  </div>

  const descriptionField = <div className="field">
    <label htmlFor="ticket-description">Ticket Description</label>
    <p>Include any specific comments on what should be improved, added, etc.</p>
    <textarea
      id="ticket-description" rows={6}
      value={ description } onChange={ e => setDescription(e.target.value) }
    ></textarea>
  </div>

  const buttons = <div className="buttons">
    <button className="custom-btn purple" onClick={() => {
      if ( title === '' || description === '' || type === '' ) return

      let result = { title: title, description: description, type: type }
      if ( ticket === undefined ){
        doAction('create_ticket', result)
      } else {
        doAction('update_ticket', [ticket.id, result])
      }
      setTitle("")
      setDescription("")
      setType("Feature")
    }}>{btnText}</button>
    <button className="custom-btn dark" onClick={() => doAction('open', `tickets_page null`)}>Cancel</button>
  </div>

  return (
    <div className="tickets-form-page">
      <button className="custom-btn" onClick={() => doAction('open', `tickets_page null`)}>Go back</button>
      <div className="ticket-form">
        <h2>{header}</h2>
        { titleField }
        { typeField }
        { descriptionField }
        { buttons }
      </div>
    </div>
  )
}

export default TicketsFormPage