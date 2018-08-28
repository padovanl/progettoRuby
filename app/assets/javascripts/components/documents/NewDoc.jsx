
class NewDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            showError: false,
            file_name: ""
        };

    }

    handleChange(file) {
        this.setState({file_name: file[0].name});
    }
    handleChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.file_name === '') {
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

        fetch('/documents', {
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
            file_name: '',
            showError: false
        });
        document.getElementById("document_attachment").value = null;
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
                                    <p className="content-author"><strong>{ this.props.current_user.name }</strong></p>
                                    <div className="file has-name">
                                        <label className="file-label">
                                            <input className="file-input" type="file" name="document[attachment]"
                                                   onChange={ (e) => this.handleChange(e.target.files) } id="document_attachment"/>
                                                <span className="file-cta">
                                                  <span className="file-icon">
                                                    <i className="fas fa-upload"></i>
                                                  </span>
                                                  <span className="file-label">
                                                    Scegli un file…
                                                  </span>
                                                </span>
                                                <span className="file-name">
                                                  { this.state.file_name }
                                                </span>
                                        </label>
                                    </div>
                                    { this.state.showError ? <ErrorMessage message="Allegare un file" /> : "" }

                                    <input type="hidden" name="document[course_id]" value={this.props.course_id}/>

                                    <div className="field has-addons tag-search">
                                        <p className="control">
                                            <input className="input" value={ this.state.message }
                                             id="post_message" type="text" placeholder="Aggiungi tag..."
                                             onChange={ (e) => this.handleChangeMessage(e) } />
                                        </p>
                                        <p className="control">
                                            <a className="button is-static">
                                                 <span className="icon">
                                                    <i className="fas fa-plus"></i>
                                                 </span>
                                            </a>
                                        </p>
                                    </div>



                                    <div className="field is-grouped is-grouped-multiline tag-field">
                                        <div className="control">
                                            <div className="tags has-addons">
                                                <a className="tag is-link">Technology</a>
                                                <a className="tag is-delete"></a>
                                            </div>
                                        </div>

                                        <div className="control">
                                            <div className="tags has-addons">
                                                <a className="tag is-link">CSS</a>
                                                <a className="tag is-delete"></a>
                                            </div>
                                        </div>

                                        <div className="control">
                                            <div className="tags has-addons">
                                                <a className="tag is-link">Flexbox</a>
                                                <a className="tag is-delete"></a>
                                            </div>
                                        </div>

                                        <div className="control">
                                            <div className="tags has-addons">
                                                <a className="tag is-link">Web Design</a>
                                                <a className="tag is-delete"></a>
                                            </div>
                                        </div>

                                        <div className="control">
                                            <div className="tags has-addons">
                                                <a className="tag is-link">Open Source</a>
                                                <a className="tag is-delete"></a>
                                            </div>
                                        </div>

                                        <div className="control">
                                            <div className="tags has-addons">
                                                <a className="tag is-link">Community</a>
                                                <a className="tag is-delete"></a>
                                            </div>
                                        </div>

                                        <div className="control">
                                            <div className="tags has-addons">
                                                <a className="tag is-link">Documentation</a>
                                                <a className="tag is-delete"></a>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <button className="button submit-button" type="submit" name="commit">
                                    Salva
                                </button>
                            </div>
                        </article>

                </section>

            </form>
        )
    }
}