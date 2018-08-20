
/*class CommentsList3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments,
        };
    }


    render() {
        let comment_list;
        const { post_id, current_user_avatar } = this.props
        const comments = this.state.comments
        if(comments !== undefined)
            comment_list = comments.map(function (comment) {
                return <Comment key={comment.id} comment={comment}></Comment>
            })

        return (
            <div>
                { comment_list }
                <NewComment post_id={ post_id } current_user_avatar={ current_user_avatar } />
            </div>
        )


    }
}*/


class CommentsList extends React.Component {
    render() {
        let comment_list;
        const { post_id, current_user_avatar, comments, deleteComment, current_user } = this.props
        comment_list = comments.map(function (comment) {
            return <Comment key={comment.id} comment={comment} deleteComment={deleteComment} current_user={current_user}></Comment>
        })

        return (
            <div>
                { comment_list }
                <NewComment post_id={ post_id } current_user_avatar={ current_user_avatar }/>
            </div>
        )


    }
}