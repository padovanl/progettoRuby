class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { post, current_user, current_user_avatar } = this.props;
        let attachments = '';
        if (post.documents !== undefined)
            attachments = post.documents.map(function (doc) {
                return <Document key={doc.id} document={doc}></Document>
            });
        let upvoters_count = ""
        if (post.upvoters.length > 0) upvoters_count = "· " + post.upvoters.length
        let current_user_upvoted = "is-light";
        post.upvoters.forEach((up) => { if (up.user.id === current_user.id) current_user_upvoted = "is-info" })

        return (
            <div className="box">

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
                            <a className={ `button ${current_user_upvoted} is-rounded upvote-button` }>{ `Upvote ${upvoters_count}` }</a>
                        </div>


                        <CommentsList post_id={post.id} comments={post.comments} current_user={current_user}
                                      current_user_avatar={current_user_avatar}/>

                    </div>
                </article>

            </div>
        );
    }
}



