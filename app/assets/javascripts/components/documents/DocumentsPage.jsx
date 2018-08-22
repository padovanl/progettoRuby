
class DocumentsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            adding_post: false,
            activeTabIndex: 0
        };
    }

    addNewPost(post) {
        post['user'] = this.props.current_user
        post['user']['avatar_url'] = this.props.current_user_avatar
        this.setState((prevState) => {
            return {
                data: [post].concat(prevState.data),
                adding_post: false
            };
        });
    }

    viewNewPostModal() {
        this.setState({adding_post: true});
    }

    closeNewPostModal() {
        this.setState({adding_post: false});
    }

    // Toggle currently active tab
    handleTabClick(tabIndex) {
        if (tabIndex !== this.state.activeTabIndex) {
            this.fetchPosts(tabIndex)
        }
    }


    render() {
        const {current_user, current_user_avatar} = this.props
        const {activeTabIndex, data, adding_post} = this.state

        const N = 4;
        let documents_list = []
        let temp_list = ''
        let docs = []
        for (let i = 0; i < data.length; i += N) {
            docs = data.slice(i, i+N);
            temp_list = docs.map((doc) => {
                return (<DocumentFrame key={doc.id} document={doc}></DocumentFrame>)
            });
            documents_list.push(<div className="tile is-ancestor"> { temp_list } </div>);
        }


        return (
            <div>
                <div className="container corso-thread">
                    <div className="filter-control">

                        <div className="field">
                            <div className="control">
                                <input className="input is-medium search-input" type="email" placeholder="Cerca" />
                            </div>
                        </div>

                    </div>


                    <div className="resources-list" id="style-1">
                        { documents_list }
                    </div>

                    <div className={"modal " + (adding_post ? "is-active" : "")}>
                        <div className="modal-background" onClick={this.closeNewPostModal.bind(this)} />

                        <NewPost addNewPost={this.addNewPost.bind(this)} current_user={current_user}
                                 current_user_avatar={current_user_avatar}/>

                        <button className="modal-close is-large" aria-label="close"
                                onClick={this.closeNewPostModal.bind(this)} />
                    </div>
                </div>
            </div>

    );

    }

    componentDidMount() {
        const {activeTabIndex} = this.state
        this.fetchPosts(activeTabIndex)
    }

    fetchPosts(activeTabIndex) {
        const {course_id, current_user} = this.props

        URL = '/documents?course_id=' + course_id
        if (activeTabIndex === 1)
        URL += '&upvoter_id=' + current_user.id
        if (activeTabIndex === 2)
        URL += '&user_id=' + current_user.id
        if (activeTabIndex === 3)
        URL += '&comment_user_id=' + current_user.id

        fetch(URL, {
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(data => this.setState({data, activeTabIndex}));
    }
    }