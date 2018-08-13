// language=JSX Harmony

class PostsThread extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    addNewPost(post) {
        post['user'] = this.props.current_user
        this.setState((prevState) => {
            return {
                data: [post].concat(prevState.data)
            };
        });
    }

    componentDidMount() {
        fetch('/posts?course_id=' + this.props.course_id)
            .then(response => response.json())
            .then(data => this.setState({data}));
    }

    render() {// <NewPost addNewPost={this.addNewPost.bind(this)}/>
        const current_user = this.props.current_user
        if (this.state.data.length > 0) {
            return (
                <div className="container corso-thread">
                    <div className="posts-list" id="style-1">
                        {
                            this.state.data.map(function (post) {
                                return <Post key={post.id} post={post} current_user={current_user}></Post>
                            })
                        }
                    </div>

                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img src="add_round_button.png"/>
                        </p>
                    </figure>

                </div>
            );
        }

        return (<span>Loading...</span>);
    }
}