class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, content, created_at, user} = this.props.comment
        const { deleteComment, can_delete } = this.props

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
                            <p className="content-date">{ (new  Date(Date.parse(created_at))).toLocaleDateString('it-IT', options) }</p>
                            <div>
                                <p>{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="media-right">
                    <DropMenu cancella={deleteComment} id={id} can_delete={can_delete} risorsa="commento"/>
                </div>
            </article>
        );
    }
}