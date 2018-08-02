
class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                                        <strong>Scrivi l'email</strong>
                                        <small>31m</small>
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
                            <p>{this.props.post.message}</p>
                            <div>
                                allegati
                            </div>

                        </div>
                        <nav className="level is-mobile">
                            <a className="level-item comment" aria-label="comment">
                                <span className="icon is-small">
                                </span>
                                <span>Commenta</span>
                            </a>
                            <a className="level-item upvote" aria-label="like">
                                <span className="icon is-small">
                                </span>
                                <span>Upvote</span>
                            </a>
                        </nav>
                    </div>
                </article>
            </div>
        );
    }
}