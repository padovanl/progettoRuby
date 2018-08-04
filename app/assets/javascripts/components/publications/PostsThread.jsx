// language=JSX Harmony

class PostsThread extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        data: {},
      };
    }

    componentDidMount() {
      fetch('/posts?course_id=' + this.props.course_id)
        .then(response => response.json())
        .then(data => this.setState({ data }));
    }

    render() {
        if (this.state.data.length > 0) {
            return (
                <div className="container corso-thread">
                    {
                        this.state.data.map(function (post) {
                            return <Post key={post.id} post={post}></Post>
                        })
                    }

                    <NewPost />
                </div>
            );
        }

        return (<span>Loading...</span>);
    }
}