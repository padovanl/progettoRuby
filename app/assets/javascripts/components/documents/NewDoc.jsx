class NewDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            file_name: "",
            query_string: "",
            tags: [],
            doc_tags: [],
            uploading: false
        };
    }

    handleChange(file) {
        this.setState({file_name: file[0].name});
    }

    handleDeleteTag(name) {
        this.setState((prevState) => {
            return {
                doc_tags: prevState.doc_tags.filter((tag) => {return tag.name !== name;}),
                query_string: ''
            };
        });
    }

    handleAddTag() {
        if (this.state.query_string != '')
            this.setState((prevState) => {
                return {
                    doc_tags: prevState.doc_tags.concat({name: prevState.query_string, id: ""}),
                    query_string: ''
                };
            });
    }

    handleAddExistingTag(tag){
        this.setState((prevState) => {
            return {
                doc_tags: prevState.doc_tags.concat(tag),
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
        const that = this
        const addNewDoc = this.props.addNewDoc

        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        fetch('/documents', {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: data,
        })
        .then(response => response.json())
        .then(function (json) {
            that.setState({
                showError: false,
                file_name: "",
                query_string: "",
                tags: [],
                doc_tags: [],
                uploading: false
            });
            addNewDoc(json)
        })
        .catch(error => console.log(error));

        this.setState({
            uploading: true
        });
        document.getElementById("document_attachment").value = null;
    }

    handleCloseModal(event) {
        event.preventDefault();
        this.setState({
            showError: false,
            file_name: "",
            query_string: "",
            tags: [],
            doc_tags: []
        });
        this.props.closeModal();
    }

    render() {
        const {tags, query_string, doc_tags, uploading } = this.state

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
                            { uploading == false ? <div className="content">
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
                                                    <i className="fas fa-plus" onClick={() => this.handleAddExistingTag(tag)}></i>
                                                 </span></li>)
                                                }, this)}
                                            </ul>
                                        </div> : ""}
                                </div>


                                <div className="field is-grouped is-grouped-multiline tag-field">
                                    {doc_tags.map(function (tag) {
                                        return (<div className="control">
                                            <div className="tags has-addons">
                                                <a className="tag is-link"> {tag.name} </a>
                                                <a className="tag is-delete" onClick={() => this.handleDeleteTag(tag.name)} ></a>
                                                <input type="hidden" name="document[tags][][id]" value={tag.id}/>
                                                <input type="hidden" name="document[tags][][name]" value={tag.name}/>
                                            </div>
                                        </div>)
                                    }, this)}
                                </div>


                            </div> : null }
                            { uploading == true ? <div className="load-spinner">
                                <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                  viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                    <path fill="#424242" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                      <animateTransform
                                         attributeName="transform"
                                         attributeType="XML"
                                         type="rotate"
                                         dur="1s"
                                         from="0 50 50"
                                         to="360 50 50"
                                         repeatCount="indefinite" />
                                  </path>
                                </svg>
                            </div> : null}

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


    fetchTags(query_string) {
        URL = '/tags?query=' + query_string

        fetch(URL, {
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => this.setState({tags: data}));
    }
}