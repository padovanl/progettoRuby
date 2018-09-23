
class CommentsList extends React.Component {
    render() {
        let comment_list;
        const { course_id, post_id, current_user_avatar, comments, deleteComment, current_user } = this.props
        comment_list = comments.sort(function(a, b) {
                            return new Date(b.created_at) < new Date(a.created_at);
                        }).map(function (comment) {
                            return <Comment key={comment.id} comment={comment} deleteComment={deleteComment}
                                            current_user={current_user} />
                        });

        return (
            <div>
                { comment_list }
                <NewComment course_id={course_id} post_id={ post_id } current_user_avatar={ current_user_avatar }/>
            </div>
        )


    }
}