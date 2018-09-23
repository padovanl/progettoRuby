class BodyQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            followed: '',
            show_details: false,
            show_quotes: false,
            content_question: '',
            modalIsActive: false,
            linkReport: ''
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
        this.setState({show_details: !this.state.show_details});
    }

    handleShowQuotes(){
        this.setState({show_quotes: !this.state.show_quotes});
    }

    getData1() {
        let linkGet =  '/courses/' + this.props.course_id + '/questions';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ questions: data }) });
    }

    getData2() {
        let linkGet =  '/api/v1/users/' + this.props.user_id + '/user_courses/' + this.props.course_id + '.json';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ followed: data }) });
    }

    componentDidMount(){
        this.getData1();
        this.getData2();
    }

    handleFormSubmit(course_id, user_id, question_text) {
        let body = JSON.stringify({courseQuestion: {course_id: course_id, user_id: user_id, question: question_text}});
        // /courses/:course_id/questions
        let linkNew = '/courses/' + this.props.course_id + '/questions';
        if (question_text != '') {
            fetch(linkNew, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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
        console.log(questionCourse)
        this.setState({
            questions: this.state.questions.concat(questionCourse)
        })
    }

    handleDelete(id){
        // /courses/:course_id/questions/:id(.:format)
        let linkDelete = '/courses/' + this.props.course_id + '/questions/' + id
        if(confirm('Sei sicuro di voler eliminare questa domanda?')){
            fetch(linkDelete,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
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
        //console.log(edit_question.id);
        let body = JSON.stringify({courseQuestion: {question: question_text}});
        let linkUpdate = '/courses/' + this.props.course_id + '/questions/' + id
        if(confirm('Sei sicuro di voler modificare questa domanda?')) {
            if (question_text != '') {
                fetch(linkUpdate,
                    {
                        method: 'PUT',
                        credentials: 'same-origin',
                        body: body,
                        headers: {
                            'Content-Type': 'application/json'
                        }
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
        console.log(courseQuestion)
        let newCourseQuestion = this.state.questions.filter((f) => f.id !== courseQuestion.id)
        console.log(newCourseQuestion)
        newCourseQuestion.push(courseQuestion)
        console.log("sono dopo la push")
        this.setState({
            questions: newCourseQuestion
        })

        /*
        const index = this.state.questions.findIndex((emp) => emp.id === courseQuestion.id);
        const updatedQuestions = update(this.state.questions, {$splice: [[index, 1, question]]});  // array.splice(start, deleteCount, item1)
        this.setState({questions: updatedQuestions});
        */
    }

    handleQuoteUp(course_question_id) {
        let body = JSON.stringify({frequencyQuestion: {course_question_id: course_question_id, user_id: this.props.user_id}});
        // /courses/:course_id/questions/:question_id/frequency_questions(.:format)
        let linkNew = '/courses/' + this.props.course_id + '/questions/' + course_question_id + '/frequency_questions';

        fetch(linkNew, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
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
        // /courses/:course_id/questions/:id(.:format)
        console.log("question id: ", course_question_id)
        console.log("frequency_question_id: ", frequency_question_id)

        let linkDelete = '/courses/' + this.props.course_id + '/questions/' + course_question_id + '/frequency_questions/' + frequency_question_id;
        fetch(linkDelete,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            return response.json()
        })
            .then((frequencyQuestion) => {
                console.log(frequencyQuestion)
                if (frequencyQuestion.error) {
                    alert("Errore!")
                } else {
                    this.updateCourseQuestion(frequencyQuestion);
                }
            })
    }

    activeModal(link){
        console.log("afadasdasdads")
        this.setState({modalIsActive: true})
        this.setState({linkReport: link})
    }

    disableModal() {
        this.setState({modalIsActive: false});
    }

    render(){
        //console.log(this.state.followed.length > 0 ? this.state.followed[0].passed : 'Items not loaded yet');        //this.state.tubedata.length > 0 && this.state.tubedata[0].id

        const gestisci_le_tue_domande_button = <a className="button is-rounded is-warning" onClick={ () => this.handleShowDetails()}>Gestisci le tue domande</a>;

        const gestisci_quote_button = <a className="button is-rounded is-warning" onClick={ () => this.handleShowQuotes()}>Quote domande</a>;


        return(
            <div>
                { this.state.followed.length > 0 && this.state.followed[0].passed ?
                    <div className="has-text-left link-resources">{gestisci_le_tue_domande_button} <span> </span>{gestisci_quote_button}</div> : null}
                <AllQuestions questions={this.state.questions}
                              course_id={this.props.course_id}
                              user_id={this.props.user_id}
                              handleDelete={this.handleDelete}
                              handleUpdate = {this.handleUpdate}
                              show_details = {this.state.show_details}
                              show_quotes = {this.state.show_quotes}
                              handleQuoteUp = {this.handleQuoteUp}
                              handleQuoteDown = {this.handleQuoteDown}
                               />
                <br/>
                <table className="table is-fullwidth">
                    <tbody>
                    { this.state.followed.length > 0 && this.state.followed[0].passed ?
                        <NewQuestionCourse course_id={this.props.course_id}
                                           user_id={this.props.user_id}
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