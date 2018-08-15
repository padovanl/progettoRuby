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
                        <p>
                            <strong>{ user.name }</strong>
                            <br/>
                            {content}
                            <br/>
                            <small>{ created_at ? (new  Date(Date.parse(created_at))).toLocaleTimeString() : (new  Date).toLocaleTimeString() }</small>
                        </p>
                    </div>
                </div>
            </article>
        );
    }
}