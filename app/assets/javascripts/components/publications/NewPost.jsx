
class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            count_files: 0
        };

    }

    handleChange(files) {
        this.setState({count_files: files.length});
    }
    handleChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const addNewPost = this.props.addNewPost

        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        fetch('/posts.json', {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: data,
        }).then(handleErrors)
        .then(response => {
            return response.json();
        }).then(function(json) {
            addNewPost(json)
        })
        .catch(error => console.log(error));

        this.setState({message: '', count_files: 0});
        document.getElementById("post_attachments").value = null;
    }

    render() {
        return (
            <form onSubmit={ (e) => this.handleSubmit(e) } className="new-post">
                <div className="card">
                    <div className="card-content">
                        <article className="media">
                            <figure className="media-left">
                                <p className="image is-64x64">
                                    <img src="https://bulma.io/images/placeholders/128x128.png"/>
                                </p>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>John Smith</strong>
                                        <small>@johnsmith</small>
                                        <small>31m</small>
                                        <br />
                                        <textarea className="textarea" rows="2" name="post[message]" value={ this.state.message }
                                                  id="post_message" type="text" placeholder="Scrivi un post..."
                                                  onChange={ (e) => this.handleChangeMessage(e) } />
                                    </p>
                                    <p className={ "control " + (this.state.count_files ? "tooltip" : '') }
                                       data-tooltip={ this.state.count_files ? this.state.count_files + " File" : '' }>
                                        <div className="file is-medium">
                                            <label className="file-label">
                                                <input className="file-input" type="file" multiple="multiple"
                                                       name="post[attachments][]" id="post_attachments" onChange={ (e) => this.handleChange(e.target.files) } />
                                                <span className="file-cta">
                                        <span className="file-icon">
                                          <i className="fas fa-upload"></i>
                                        </span>
                                    </span>
                                            </label>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <footer className="card-footer">
                        <p className="card-footer-item">
                            <button className="button submit-button" type="submit" name="commit">
                                Invia
                            </button>
                        </p>
                    </footer>
                </div>
            </form>
        )
    }
}