import { useState } from "react";

const Comment = ({ data }) => {

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
      </div>
      <div className="body">
        <div className="description">
          <div>
            <p>{ data.content }</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
