class AddRep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            showError: false,
            modalState: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }


    handleSubmit(event) {
        event.preventDefault();
        if (this.state.message === '') {
            this.setState({showError: true});
            return
        }

        this.setState({courseName: event.target[2].name, courseId: event.target[2].value});

        let myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        //   myHeaders.append('Content-Type', 'application/json');

        //user_id, course_id, follow=true lo faccio direttamente nel controller (chiamando la funzione dal model)
        const data = new FormData(event.target); // event.target gives you the native DOMNode

        const options = {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: (data),
        };

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        const request = new Request('/reps', options);

        fetch(request).then(handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => console.log(error));
        document.getElementById("post_attachments").value = null;
    }

    showModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;

            return { modalState: newState };
        });
    }

    closeModal() {
        this.setState({modalState: false}, this.props.reloadCourses());
    }


    render() {
        return (
            <form onSubmit={ (e) => this.handleSubmit(e) }>
                <a className={"fixed"} onClick={() => this.showModal()}><i className={"fas fa-plus fa-3x"} title={"Add post"}/></a>

                <div className={"modal" + (this.state.modalState ? "is-active" : "")}>
                    <div className="modal-background" onClick={this.closeModal} />
                    <div className="modal-content">
                        <div className={"box"}>
                            <article className={"media"}>
                                <div className={"media-left"}>
                                    <figure className="image is-64x64">
                                        <i className="far fa-grin-alt fa-4x" />
                                    </figure>
                                </div>
                                <div className={"media-content "}>
                                    <p>
                                        <strong>Corso <span className={"has-text-success"}>{}</span> aggiunto tra i seguiti! </strong>
                                        <br/>
                                        <span>Vuoi visualizzarlo?</span>
                                    </p>
                                    <a className="segui">
                                        Show Course
                                    </a>

                                    <button className="modal-close is-large" aria-label="close"
                                            onClick={this.closeModal.bind(this)} />
                                </div>
                            </article>
                        </div>
                    </div>

                </div>

            </form>
        )
    }

}