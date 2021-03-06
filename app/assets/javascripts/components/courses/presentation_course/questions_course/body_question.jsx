class BodyQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            followed: this.props.details_follow_course,
            show_details: false,
            show_quotes: false,
            content_question: '',
            modalIsActive: false,
            linkReport: '',
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewQuestionCourse = this.addNewQuestionCourse.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteCourseQuestion = this.deleteCourseQuestion.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateCourseQuestion = this.updateCourseQuestion.bind(this)
        this.handleShowDetails = this.handleShowDetails.bind(this)
        this.handleShowQuotes = this.handleShowQuotes.bind(this)
        this.handleQuoteUp = this.handleQuoteUp.bind(this)
        this.handleQuoteDown = this.handleQuoteDown.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.activeModal = this.activeModal.bind(this)

    }

    handleChange(event) {
        this.setState({content_question: event.target.value});
    }

    handleShowDetails(){
        this.show_details_active = !this.state.show_details ? this.active_button :
            null;
        this.setState({show_details: !this.state.show_details});
    }

    handleShowQuotes(){
        this.show_quotes_active = !this.state.show_quotes ? this.active_button :
            null;
        this.setState({show_quotes: !this.state.show_quotes});
    }

    getData1() {
        let linkGet =  '/courses/' + this.props.course_id + '/questions';
        fetch(linkGet, {credentials: "same-origin"})
            .then((response) => {return response.json()})
            .then((data) => {
                this.setState({ questions: data })
                //this.setState({ questions: data, n_your_question: n_your_question,  n_other_question: n_other_question})
            });
    }

    componentDidMount(){
        this.getData1();
        this.show_details_active = null
        this.show_quotes_active = null
    }

    handleFormSubmit(course_id, user_id, question_text) {
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');
        let body = JSON.stringify({courseQuestion: {course_id: course_id, user_id: user_id, question: question_text}});
        // /courses/:course_id/questions
        let linkNew = '/courses/' + this.props.course_id + '/questions';
        if (question_text != '') {
            fetch(linkNew, {
                method: 'POST',
                headers: myHeaders,
                body: body,
                credentials: 'same-origin'
            }).then((response) => {
                return response.json()
            })
                .then((courseQuestion) => {
                    if (courseQuestion.error) {
                        alert("Errore!")
                    } else {
                        this.addNewQuestionCourse(courseQuestion);
                        this.setState({
                            content_question: ''
                        })
                    }

                })
        } else {
            alert('Il campo non può essere vuoto')
        }
    }

    addNewQuestionCourse(questionCourse){
        this.setState({
            questions: this.state.questions.concat(questionCourse)
        })
    }

    handleDelete(id){
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');        let linkDelete = '/courses/' + this.props.course_id + '/questions/' + id
        if(confirm('Sei sicuro di voler eliminare questa domanda?')){
            fetch(linkDelete,
                {
                    method: 'DELETE',
                    headers: myHeaders,
                    credentials: "same-origin"
                }).then((response) => {
                if (response.ok){
                    this.deleteCourseQuestion(id)
                }else{
                    alert("errore")
                }
            })
        }
    }

    deleteCourseQuestion(id){
        let newCourseQuestion = this.state.questions.filter((f) => f.id !== id)
        this.setState({questions: newCourseQuestion})
    }

    handleUpdate(question_text, id){
        console.log(question_text)
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');        let body = JSON.stringify({courseQuestion: {question: question_text}});
        let linkUpdate = '/courses/' + this.props.course_id + '/questions/' + id
        if(confirm('Sei sicuro di voler modificare questa domanda?')) {
            if (question_text != '') {
                fetch(linkUpdate,
                    {
                        method: 'PUT',
                        credentials: 'same-origin',
                        body: body,
                        headers: myHeaders
                    }).then((response) => {
                    return response.json()
                })
                    .then((courseQuestion) => {
                        if (courseQuestion.error) {
                            alert("Errore!")
                        } else {
                            this.updateCourseQuestion(courseQuestion);
                        }

                    })
            } else {
                alert("I campi non possono essere vuoti!")
            }
        }
    }

    updateCourseQuestion(courseQuestion){
        let newCourseQuestion = this.state.questions.filter((f) => f.id !== courseQuestion.id)
        newCourseQuestion.push(courseQuestion)
        this.setState({
            questions: newCourseQuestion
        })
    }

    handleQuoteUp(course_question_id) {
        let body = JSON.stringify({frequencyQuestion: {course_question_id: course_question_id, user_id: this.props.current_user.id}});
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');
        let linkNew = '/courses/' + this.props.course_id + '/questions/' + course_question_id + '/frequency_questions';

        fetch(linkNew, {
            method: 'POST',
            headers: myHeaders,
            body: body,
            credentials: "same-origin"
        }).then((response) => {
            return response.json()
        })
            .then((frequencyQuestion) => {
                if (frequencyQuestion.error) {
                    alert("Errore!")
                } else {
                    this.updateCourseQuestion(frequencyQuestion);
                }
            })
    }

    handleQuoteDown(course_question_id, frequency_question_id){
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');
        let linkDelete = '/courses/' + this.props.course_id + '/questions/' + course_question_id + '/frequency_questions/' + frequency_question_id;

        fetch(linkDelete,
            {
                method: 'DELETE',
                headers: myHeaders,
                credentials: "same-origin"
            }).then((response) => {
            return response.json()
        })
            .then((frequencyQuestion) => {
                if (frequencyQuestion.error) {
                    alert("Errore!")
                } else {
                    this.updateCourseQuestion(frequencyQuestion);
                }
            })
    }

    activeModal(link){
        this.setState({modalIsActive: true})
        this.setState({linkReport: link})
    }

    disableModal() {
        this.setState({modalIsActive: false});
    }

    render(){

        const n_your_question = this.state.questions.filter((q) => q.user_id == this.props.current_user.id).length;
        const n_other_question = this.state.questions.filter((q) => q.user_id != this.props.current_user.id).length;

        const gestisci_le_tue_domande_button = (this.state.questions.length && n_your_question > 0 || this.state.questions.length && this.props.current_user.admin) ?
            <a className="button is-rounded is-warning details_padding color_details" onClick={ () => this.handleShowDetails()} style={this.show_details_active}>Gestisci le tue domande</a> : null;
        const gestisci_quote_button = (this.state.questions.length && n_other_question > 0) ? <a className="button is-rounded is-warning" onClick={ () => this.handleShowQuotes()} style={this.show_quotes_active}>Quote domande</a> : null;

         this.active_button = {
          borderColor: 'black',
        };


        return(
            <div>
                { this.state.followed && this.state.followed.passed || this.props.current_user.admin ?
                    <div className="has-text-left link-resources">{gestisci_le_tue_domande_button} <span> </span>{gestisci_quote_button}</div> : null}
                <AllQuestions questions={this.state.questions}
                              course_id={this.props.course_id}
                              current_user={this.props.current_user}
                              handleDelete={this.handleDelete}
                              handleUpdate = {this.handleUpdate}
                              show_details = {this.state.show_details}
                              show_quotes = {this.state.show_quotes}
                              handleQuoteUp = {this.handleQuoteUp}
                              handleQuoteDown = {this.handleQuoteDown}
                              activeModal = {this.activeModal}/>
                <br/>
                <table className="table is-fullwidth">
                    <tbody>
                    { this.state.followed && this.state.followed.passed ?
                        <NewQuestionCourse course_id={this.props.course_id}
                                           current_user={this.props.current_user}
                                           handleFormSubmit={this.handleFormSubmit}
                                           content_question={this.state.content_question}
                                           handleChange={this.handleChange} /> : null}
                    </tbody>
                </table>
                <div className={"modal " + (this.state.modalIsActive ? "is-active" : "")}>
                    <div className="modal-background" onClick={this.disableModal.bind(this)} />

                    <ReportModal  linkReport={this.state.linkReport}
                                  disableModal={this.disableModal.bind(this)} title={"Segnalazione domanda"}/>

                    <button className="modal-close is-large" aria-label="close"
                            onClick={this.disableModal.bind(this)} />
                </div>
            </div>
        )
    }
}