
class Post2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const post = this.props.post;
        let attachments = '';
        if(post.documents.length > 0)
            attachments = post.documents.map(function (doc) {
                                return <Document key={doc.id} document={doc}></Document>
                            });

        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/64x64.png" alt="Image"/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <div className="columns is-mobile">
                                <div className="column">
                                    <p>
                                        <strong>{ post.user.email }</strong>
                                        <small>{ (new Date(Date.parse(post.created_at))).toLocaleString() }</small>
                                    </p>
                                </div>
                                <div className="dropdown is-hoverable is-right column is-narrow">
                                    <div className="dropdown-trigger">

                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-content"></div>
                                    </div>
                                </div>
                            </div>
                            <p>{ post.message }</p>
                            <div>
                                { attachments }
                            </div>

                        </div>
                        <nav className="level is-mobile">
                            <a className="level-item comment" aria-label="comment">
                                <span className="icon is-medium">
                                    <i className="far fa-comments"></i>
                                </span>
                                <span>Commenta</span>
                            </a>
                            <a className="level-item upvote" aria-label="like">
                                <span className="icon is-medium">
                                    <i className="far fa-thumbs-up"></i>
                                </span>
                                <span>Upvote</span>
                            </a>
                        </nav>

                        <CommentsList comments_count={ post.comments_count } commets={ post.commets } />
                    </div>

                </article>

            </div>
        );
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const post = this.props.post;
        let attachments = '';
        if(post.documents.length > 0)
            attachments = post.documents.map(function (doc) {
                return <Document key={doc.id} document={doc}></Document>
            });

        return (
            <div className="box">

                <article className="media">
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png"/>
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{ post.user.email }</strong>
                                <br/>
                                { post.message }
                                <br/>
                                <div>
                                    { attachments }
                                </div>
                                <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                            </p>

                        </div>


                        <CommentsList comments_count={ post.comments_count } commets={ post.commets } />

                    </div>
                </article>

            </div>
        );
    }
}



