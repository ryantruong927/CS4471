"use strict"

function CreatePosts(props) {

    let back = <button className="companybtn pill" onClick={() => props.onClick("posts")}><p>back</p></button>
    let post = <button className="companybtn pill"><p>Create Post</p></button>

    const nameField = <div className="field">
        <label htmlFor="title">Name: </label>
        <input type="text" id="title" autoComplete="off"/>
    </div>

    const descField = <div className="field">
        <label htmlFor="title">Description: </label>
        <input type="text" id="title" autoComplete="off"/>
    </div>

    const tagsField = <div className="field">
        <label htmlFor="title">Tags: </label>
        <input type="text" id="title" autoComplete="off"/>
    </div>

    return (
        <div id="edit">
            <h1>Create Post</h1>
                { nameField }
                { descField }
                { tagsField }
                <p></p>
            <div id="btn">
                {post}
            </div>
        <div id="back-btn">
            {back}
        </div>
        </div>
    )
}

class createPost extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {}
}