import { useState } from "react";
import Comment from "./Comment";

const CommentSpace = () => {

  const userTest = {
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
      name: 'Marco Reus',
      username: 'marco2345'
  }
  const [ comments, setComments ] = useState([
    {
      id: 1,
      user: userTest,
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam cum dignissimos doloremque, dolores et illo in inventore ipsa nobis perferendis, quae reiciendis vel."
    }
  ])
  const [ newComment, setNewComment ] = useState("")

  const postComment = () => {
    setComments([ ...comments, { id: comments.length + 1, user: userTest, content: newComment } ])
    setNewComment("")
  }

  const commentForm = <div className="post-comment">
    <h3>Add Comment</h3>
    <textarea
      placeholder="Type your comment here" maxLength={300} rows={3}
      value={newComment} onChange={ e => setNewComment(e.target.value) }
    ></textarea>
    <div>
      <span>{300-newComment.length} characters left</span>
      <button
        className="custom-btn" onClick={postComment}
        disabled={ newComment.length == 0 }
      >Post Comment</button>
    </div>
  </div>

  return (
    <div className="comment-space">
      <div className="comments">
        <h3>{comments.length} Comments</h3>
        { comments.map( comment => <Comment key={comment.id} data={comment} /> ) }
      </div>
      { commentForm }
    </div>
  )
}

export default CommentSpace