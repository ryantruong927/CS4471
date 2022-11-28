import { useState } from "react";

const Comment = ({ data }) => {

  const [ showReplyForm, setShowReplyForm ] = useState(false)
  const [ reply, setReply ] = useState("")

  const replyForm = <div className="reply-form">
    <div>
      <textarea
        placeholder="Type your comment here" maxLength={300}
        onChange={ e => setReply(e.target.value) }
      ></textarea>
      <button
        className="custom-btn"
        onClick={ () => {
          // postReply(reply)
          // setShowReplyForm(false)
          // setReply("")
        } }
        disabled={ reply.length == 0 }
      >Post Reply</button>
    </div>
  </div>

  return (
    <div className="ticket-comment">
      <div className="header">
        <div className="col">
          <div className="profile-pic">
            <img src={data.user.image}/>
          </div>
        </div>
        <div className="col">
          <div className="names">
            <h4>{data.user.name}</h4>
            <p>@{data.user.username}</p>
          </div>
        </div>
        <div className="col">
          <div className="reply">
            <a onClick={() => setShowReplyForm(!showReplyForm)}>Reply</a>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="description">
          <div>
            <p>{ data.content }</p>
          </div>
        </div>
        { showReplyForm && replyForm }
      </div>
    </div>
  )
}

export default Comment
