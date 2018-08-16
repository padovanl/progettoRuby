class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {content, created_at, user} = this.props.comment

        return (
            <article className="media">
                <figure className="media-left">
                    <p className="image is-32x32">
                        <img src={user.avatar_url}/>
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <div className="content">
                            <p className="content-author"><strong>{user.name}</strong></p>
                            <p className="content-date">{ created_at ? (new  Date(Date.parse(created_at))).toLocaleTimeString() : (new  Date).toLocaleTimeString() }</p>
                            <div>
                                <p>{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}