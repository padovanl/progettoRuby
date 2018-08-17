
const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_upvoted: false,
            upvote_id: '',
            post: this.props.post
        };
    }

    // Callback function to setState in App from Line Action Cable
    updatePostStateUpvote(post) {
        this.setState({
            post: post['post'],
            user_upvoted: false,
            upvote_id: ''
        })
    }

    render() {
        const { current_user, current_user_avatar } = this.props;
        const { post } = this.state
        let attachments = '';
        if (post.documents !== undefined)
            attachments = post.documents.map(function (doc) {
                return <Document key={doc.id} document={doc}></Document>
            });
        let upvoters_count = ""

        if (post.upvoters.length > 0) upvoters_count = "· " + post.upvoters.length
        post.upvoters.forEach((up) => {
            if (up.user.id === current_user.id) {
                this.state.user_upvoted = true
                this.state.upvote_id = up.id
            }
        })

        return (
            <div className="box">

                <UpvotesWebSocket
                    data-updateApp={ this.updatePostStateUpvote.bind(this) }
                    postData={ post.id }
                />

                <article className="media">
                    <figure className="media-left">
                        <p className="image is-48x48">
                            <img src={ post.user.avatar_url }/>
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p className="content-author"><strong>{post.user.name}</strong></p>
                            <p className="content-date">{(new  Date(Date.parse(post.created_at))).toLocaleDateString('it-IT', options)}</p>
                            <div>
                                <p>{post.message}</p>
                            </div>
                            <div>
                                {attachments}
                            </div>
                            <br/>
                            <a className={ `button ${this.state.user_upvoted ? "is-info" : "is-light"} is-rounded upvote-button` }
                               onClick={() => this.toggleUpvote()}>{ `Upvote ${upvoters_count}` }</a>
                        </div>


                        <CommentsList post_id={post.id} comments={post.comments} current_user={current_user}
                                      current_user_avatar={current_user_avatar} deleteComment={ this.deleteComment.bind(this) }/>

                    </div>
                </article>

            </div>
        );
    }

    toggleUpvote() {
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        let fetchCall
        if(this.state.upvote_id === '')
            fetchCall = fetch(`/upvotes?post_id=${this.props.post.id}`, {
                method: 'POST',
                headers: myHeaders,
                credentials: 'same-origin'
            })
        else
            fetchCall = fetch(`/upvotes/${this.state.upvote_id}`, {
                method: 'DELETE',
                headers: myHeaders,
                credentials: 'same-origin'
            })


        fetchCall
            .then(response => response.json())
            .then(data => this.setState({}))
            .catch(error => console.log(error));
    }


    deleteComment(comment_id) {
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        fetch(`/comments/${comment_id}`, {
            method: 'DELETE',
            headers: myHeaders,
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => this.setState({}))
        .catch(error => console.log(error));
    }
}



