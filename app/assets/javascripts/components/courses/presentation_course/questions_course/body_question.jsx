class BodyQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            followed: ''
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewQuestionCourse = this.addNewQuestionCourse.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteCourseQuestion = this.deleteCourseQuestion.bind(this);
    }

    getData1() {
        let linkGet =  '/courses/' + this.props.course_id + '/questions';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ questions: data }) });
    }

    getData2() {
        let linkGet =  '/api/v1/users/' + this.props.user_id + '/user_courses/' + this.props.course_id;
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
            }).then((response) => {
                return response.json()
            })
                .then((courseQuestion) => {
                    if (courseQuestion.error) {
                        alert("Errore!")
                    } else {
                        this.addNewQuestionCourse(courseQuestion);
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

    render(){
        //console.log(this.state.followed.length > 0 ? this.state.followed[0].passed : 'Items not loaded yet');        //this.state.tubedata.length > 0 && this.state.tubedata[0].id
        return(
            <div>
                <AllQuestions questions={this.state.questions}  course_id={this.props.course_id} user_id={this.props.user_id} handleDelete={this.handleDelete} />
                <table className="table is-hoverable is-fullwidth">
                    <tbody>
                    { this.state.followed.length > 0 && this.state.followed[0].passed ? <NewQuestionCourse course_id={this.props.course_id} user_id={this.props.user_id} handleFormSubmit={this.handleFormSubmit} /> : null}
                    </tbody>
                </table>
            </div>
        )
    }
}