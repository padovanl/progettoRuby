
class CommentsList3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments,
        };
    }

    addNewComment(comment) {
        /*comment['user'] = this.props.current_user
        comment['user']['avatar_url'] = this.props.current_user_avatar
        this.setState((prevState) => {
            return {
                comments: prevState.comments.concat(comment)
            };
        });*/
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
                <NewComment post_id={ post_id } current_user_avatar={ current_user_avatar }
                            addNewComment={this.addNewComment.bind(this)} />
            </div>
        )


    }
}


class CommentsList extends React.Component {
    render() {
        let comment_list;
        const { post_id, current_user_avatar, comments, deleteComment } = this.props
        comment_list = comments.map(function (comment) {
            return <Comment key={comment.id} comment={comment} deleteComment={deleteComment}></Comment>
        })

        return (
            <div>
                { comment_list }
                <NewComment post_id={ post_id } current_user_avatar={ current_user_avatar }/>
            </div>
        )


    }
}