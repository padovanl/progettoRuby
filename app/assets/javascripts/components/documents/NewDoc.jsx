class NewDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            file_name: "",
            query_string: "",
            tags: [],
            doc_tags: []
        };
    }

    handleChange(file) {
        this.setState({file_name: file[0].name});
    }

    handleAddTag() {
        if (this.state.query_string != '')
            this.setState((prevState) => {
                return {
                    doc_tags: prevState.doc_tags.concat({name: prevState.query_string}),
                    query_string: ''
                };
            });
    }

    handleChangeQuery(event) {
        this.setState({query_string: event.target.value});

        this.fetchTags(event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.file_name === '') {
            this.setState({showError: true});
            return
        }

        const data = new FormData(event.target);
        const addNewDoc = this.props.addNewDoc

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
            }).then(function (json) {
            console.log(json)
            addNewDoc(json)
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
        const {tags, query_string, doc_tags} = this.state

        return (
            <form onSubmit={(e) => this.handleSubmit(e)} className="modal-card">
                <section className="modal-card-body">
                    <article className="media">
                        <figure className="media-left">
                            <p className="image is-48x48">
                                <img src={this.props.current_user_avatar}/>
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p className="content-author"><strong>{this.props.current_user.name}</strong></p>
                                <div className="file has-name">
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="document[attachment]"
                                               onChange={(e) => this.handleChange(e.target.files)}
                                               id="document_attachment"/>
                                        <span className="file-cta">
                                                  <span className="file-icon">
                                                    <i className="fas fa-upload"></i>
                                                  </span>
                                                  <span className="file-label">
                                                    Scegli un file…
                                                  </span>
                                                </span>
                                        <span className="file-name">
                                                  {this.state.file_name}
                                                </span>
                                    </label>
                                </div>
                                {this.state.showError ? <ErrorMessage message="Allegare un file"/> : ""}

                                <input type="hidden" name="document[course_id]" value={this.props.course_id}/>

                                <div className="field has-addons tag-search">
                                    <p className="control">
                                        <input className="input" value={this.state.query_string}
                                               id="query-tag" type="text" placeholder="Aggiungi tag..."
                                               onChange={(e) => this.handleChangeQuery(e)}/>
                                    </p>
                                    <p className="control" id="new-tag" onClick={() => this.handleAddTag()}>
                                        <a className="button is-static">
                                             <span className="icon">
                                                    <i className="fas fa-plus"></i>
                                             </span>
                                        </a>
                                    </p>
                                    {(tags.length > 0 && query_string != '') ?
                                        <div id="style-1" className="tag-list box">
                                            <ul>
                                                {tags.map(function (tag) {
                                                    return (
                                                        <li key={tag.id} className="level is-mobile"><a> {tag.name} </a><span
                                                            className="icon">
                                                    <i className="fas fa-plus"></i>
                                                 </span></li>)
                                                })}
                                            </ul>
                                        </div> : ""}
                                </div>


                                <div className="field is-grouped is-grouped-multiline tag-field">
                                    {doc_tags.map(function (tag) {
                                        return (<div className="control">
                                            <div className="tags has-addons">
                                                <a className="tag is-link"> {tag.name} </a>
                                                <a className="tag is-delete"></a>
                                                <input type="hidden" name="document[tags][]" value={tag.name}/>
                                            </div>
                                        </div>)
                                    })}
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


    fetchTags(query_string) {
        URL = '/tags?query=' + query_string

        fetch(URL, {
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(data => this.setState({tags: data}));
    }
}