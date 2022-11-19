
const Ticket = ({ data }) => {

  const voting = <>
    <div className="votes">
      <div className="voting-btn upvote">
        <span>▲</span><span>{data.upvotes}</span>
      </div>
      <div className="voting-btn downvote">
        <span>▼</span><span>{data.downvotes}</span>
      </div>
    </div>
  </>

  const body = <>
    <div className="ticket-body">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <div className="ticket-type">{data.type}</div>
    </div>
  </>

  const comments = <>
    <div className="comment-number">
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