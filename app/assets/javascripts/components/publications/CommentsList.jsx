
class CommentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments,
        };
    }

    addNewComment(comment) {
        comment['user'] = this.props.current_user
        this.setState((prevState) => {
            return {
                comments: prevState.comments.concat(comment)
            };
        });
    }

    render() {
        let comment_list;
        const comments = this.state.comments
        if(comments.length > 0)
            comment_list = comments.map(function (comment) {
                return <Comment key={comment.id} comment={comment}></Comment>
            })

        return (
            <div>
                { comment_list }
                <NewComment post_id={this.props.post_id} addNewComment={this.addNewComment.bind(this)} />
            </div>
        )


    }
}