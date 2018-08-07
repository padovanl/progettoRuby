// language=JSX Harmony

class PostsThread extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        data: {},
      };
  }

    addNewPost(post){console.log(JSON.stringify(this.state.data))
      console.log(post)
      this.setState({ data: this.state.data.append(post) })

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
                    <div className="posts-list" id="style-1">
                        {
                            this.state.data.map(function (post) {
                                return <Post key={post.id} post={post}></Post>
                            })
                        }
                    </div>
                    <NewPost addNewPost={ this.addNewPost.bind(this) } />
                </div>
            );
        }

        return (<span>Loading...</span>);
    }
}