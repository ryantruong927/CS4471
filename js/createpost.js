"use strict"

function CreatePosts(props) {

    var test = new createPost(props);

    let back = <button className="companybtn pill" onClick={() => props.onClick("posts")}><p>back</p></button>
    let post = <button className="companybtn pill" onClick={() => test.create(props.id)}><p>Create Post</p></button>

    const nameField = <div className="field">
        <label htmlFor="title">Name: </label>
        <input type="text" id="name" autoComplete="off" defaultValue={""}/>
    </div>

    const descField = <div className="field">
        <label htmlFor="title">Description: </label>
        <input type="text" id="desc" autoComplete="off" defaultValue={""}/>
    </div>

    const tagsField = <div className="field">
        <label htmlFor="title">Tags: </label>
        <input type="text" id="tags" autoComplete="off" defaultValue={""}/>
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
        this.create = this.create.bind(this)
    }

    create(companyId) {
        var name = document.getElementById("name").value;
        var description = document.getElementById("desc").value;
        var tags = document.getElementById('tags').value;

        axios.post('http://localhost:4000/new_post', {
            name: name,
            description: description,
            companyId: companyId,
            tags: tags
        }).then((response) => {
          console.log(response);
        })
        window.location.href = window.location.href.split("#")[0];

      };

    render() {
    }
}