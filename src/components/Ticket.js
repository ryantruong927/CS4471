
const Ticket = ({ data, doAction }) => {

  const voting = <>
    <div className="votes">
      <div className="voting-btn upvote" onClick={() => doAction('upvote', data.id)}>
        <span>▲</span><span>{data.upvotes}</span>
      </div>
      <div className="voting-btn downvote" onClick={() => doAction('downvote', data.id)}>
        <span>▼</span><span>{data.downvotes}</span>
      </div>
    </div>
  </>

  const body = <>
    <div className="ticket-body">
      <h3 onClick={() => doAction('open', `tickets_page_single ${data.id}`)}>{data.title}</h3>
      <p>{data.description}</p>
      <div className="ticket-type">{data.type}</div>
    </div>
  </>

  const comments = <>
    <div className="comment-number" onClick={() => doAction('open', `tickets_page_single ${data.id}`)}>
      <span>📥</span><span>{data.comments}</span>
    </div>
  </>

  return (
    <div className="ticket">
      <div className="col">
        { voting }
      </div>
      <div className="col">
        { body }
      </div>
      <div className="col">
        { comments }
      </div>
    </div>
  )
}

export default Ticket