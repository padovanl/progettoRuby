
class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            count_files: 0,
            showError: false
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
        if (this.state.message === '') {
            this.setState({showError: true});
            return
        }

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

        fetch('/posts', {
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

        this.setState({
            message: '',
            count_files: 0,
            showError: false
        });
        document.getElementById("post_attachments").value = null;
    }

    handleCloseModal(event) {
        event.preventDefault();
        this.setState({
            message: '',
            count_files: 0,
            showError: false
        });
        this.props.closeModal();
    }

    render() {
        return (
            <form onSubmit={ (e) => this.handleSubmit(e) } className="modal-card">
                <section className="modal-card-body">
                        <article className="media">
                            <figure className="media-left">
                                <p className="image is-48x48">
                                    <img src={ this.props.current_user_avatar }/>
                                </p>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <p className="content-author"><strong>{ this.props.current_user.name }</strong></p>
                                        <textarea className="textarea" rows="2" name="post[message]" value={ this.state.message }
                                                  id="post_message" type="text" placeholder="Scrivi un post..."
                                                  onChange={ (e) => this.handleChangeMessage(e) } />
                                        { this.state.showError ? <ErrorMessage message="Il campo non può essere vuoto" /> : "" }
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
                                    <input type="hidden" name="post[course_id]" value={this.props.course_id}/>
                                </div>
                                <div className="modal-buttons">
                                    <button className="button submit-button is-info is-rounded" type="submit" name="commit">
                                        Salva
                                    </button>
                                    <button className="button submit-button is-rounded" onClick={(e) => this.handleCloseModal(e)}>
                                        Annulla
                                    </button>
                                </div>
                            </div>
                        </article>

                </section>

            </form>
        )
    }
}