class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_upvoted: false,
            upvote_id: '',
            upvoters: this.props.post.upvoters
        };
    }

    // Callback function to setState in App from Line Action Cable
    updatePostStateUpvote(upvoters) {
        console.log('updatePostStateUpvote: ', this.state.upvoters)
        this.setState({
            upvoters: upvoters,
            user_upvoted: false,
            upvote_id: ''
        })
    }

    render() {
        const { post, current_user, current_user_avatar } = this.props;
        const { upvoters } = this.state
        let attachments = '';
        if (post.documents !== undefined)
            attachments = post.documents.map(function (doc) {
                return <Document key={doc.id} document={doc}></Document>
            });
        let upvoters_count = ""

        if (upvoters.length > 0) upvoters_count = "· " + upvoters.length
        upvoters.forEach((up) => {
            if (up.user.id === current_user.id) {
                this.state.user_upvoted = true
                this.state.upvote_id = up.id
            }
        })

        return (
            <div className="box">

                <UpvotesWebSocket
                    data-cableApp={ window.App }
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
                            <p className="content-date">{(new  Date(Date.parse(post.created_at))).toLocaleTimeString()}</p>
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
                                      current_user_avatar={current_user_avatar}/>

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
}



