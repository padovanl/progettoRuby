// opzioni per la visulizzazione della data nei post e commenti
const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_upvoted: false,
            upvote_id: '',
            post: this.props.post,
            view_post: true,
            course_id: this.props.course_id
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
        const { current_user, current_user_avatar, course_id } = this.props;
        const { post } = this.state;
        let attachments = '';
        if(post.documents.length > 0)
          attachments = (<div className="level"> <div className="level-left">
            { post.documents.map(function (doc) {
                        return <div className="level-item"><Document key={doc.id} document={doc} /></div>
                    }) }
            </div></div>);
        let upvoters_count = "";

        if (post.upvotes.length > 0) upvoters_count = "· " + post.upvotes.length;
        post.upvotes.forEach((up) => {
            if (up.upvoter_id === current_user.id) {
                this.state.user_upvoted = true;
                this.state.upvote_id = up.id
            }
        });

        let can_delete_post = !!(post.user.id === current_user.id || current_user.admin);
        if (this.state.view_post)
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

                                {attachments}

                                <br/>
                                <a className={ `button ${this.state.user_upvoted ? "is-info" : "is-light"} is-rounded upvote-button` }
                                   onClick={ () => this.toggleUpvote()}>{ `Upvote ${upvoters_count}` }</a>
                            </div>


                            <CommentsList course_id={course_id} post_id={post.id} comments={post.comments} current_user={current_user}
                                          current_user_avatar={current_user_avatar} deleteComment={ this.deleteComment.bind(this) }
                                          activeModal={ this.props.activeModal } />

                        </div>
                        <div className="media-right">
                            <DropMenu cancella={ this.deletePost.bind(this) }
                                      id={post.id}
                                      can_delete={can_delete_post}
                                      risorsa="post"
                                      course_id={ this.state.course_id }
                                      activeModal={ this.props.activeModal } />
                        </div>
                    </article>

                </div>
            );
        else
            return <div/>
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
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }


    deleteComment(event, comment_id) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        fetch(`/comments/${comment_id}`, {
            method: 'DELETE',
            headers: myHeaders,
            credentials: 'same-origin'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    deletePost(event, post_id) {
        event.preventDefault();
        if(this.state.post.user.id !== this.props.current_user.id && !this.props.current_user.admin)
            return;

        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        fetch(`/posts/${post_id}?course_id=${this.state.course_id}`, {
            method: 'DELETE',
            headers: myHeaders,
            credentials: 'same-origin'
        })
        .then((response) => response)
        .then((response) => {
            this.setState({
                view_post: false
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }
}



