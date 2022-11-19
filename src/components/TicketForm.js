import {useState} from "react";

const TicketForm = ({ createTicket }) => {

  const [ title, setTitle ] = useState("")
  const [ type, setType ] = useState("Feature")
  const [ description, setDescription ] = useState("")

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
    <p>Choose a category for your feedback</p>
    <select id="ticket-type" value={ type } onChange={ e => setType(e.target.value) }>
      { types.map( i => <option key={i} value={i}>{i}</option> ) }
    </select>
  </div>

  const descriptionField = <div className="field">
    <label htmlFor="ticket-description">Ticket Description</label>
    <p>Include any specific comments on what should be improved, added, etc.</p>
    <textarea
      id="ticket-description" rows={3}
      value={ description } onChange={ e => setDescription(e.target.value) }
    ></textarea>
  </div>

  const buttons = <div className="buttons">
    <button className="custom-btn purple" onClick={() => {
      if ( title === '' || description === '' || type === '' ) return
      createTicket({ title: title, description: description, type: type })
      setTitle("")
      setDescription("")
      setType("Feature")
    }}>Add Feedback</button>
    <button className="custom-btn dark">Cancel</button>
  </div>

  return (
    <div className="ticket-form">
      <h2>Create new ticket</h2>
      { titleField }
      { typeField }
      { descriptionField }
      { buttons }
    </div>
  )
}

export default TicketForm