
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
            addNewPost(json["post"])
        })
        .catch(error => console.log(error));

        this.setState({message: '', count_files: 0});
        document.getElementById("post_attachments").value = null;
    }

    render() {
        return (
            <form onSubmit={ (e) => this.handleSubmit(e) } className="new-post">
                <div>
                    <div className="field has-addons">
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
                        <p className="control message-input">
                            <input className="input is-medium" name="post[message]" value={ this.state.message }
                                   id="post_message" type="text" placeholder="Scrivi un post..."
                                   onChange={ (e) => this.handleChangeMessage(e) } />
                        </p>
                        <p className="control">
                            <button className="button is-medium" type="submit" name="commit">
                                Invia
                            </button>
                        </p>
                    </div>
                </div>
            </form>
        )
    }
}