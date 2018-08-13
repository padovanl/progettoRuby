class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {content, created_at, user} = this.props.comment

        return (
            <article className="media">
                <figure className="media-left">
                    <p className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png"/>
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{user.email}</strong>
                            <br/>
                            {content}
                            <br/>
                            <small>{(new  Date(Date.parse(created_at))).toLocaleTimeString()}</small>
                        </p>
                    </div>
                </div>
            </article>
        );
    }
}