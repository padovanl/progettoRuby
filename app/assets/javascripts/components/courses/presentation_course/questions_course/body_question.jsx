class BodyQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };

    }

   componentDidMount(){
        let linkGet =  '/courses/' + this.props.course_id + '/questions';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ questions: data }) });
    }

    render(){
        console.log("id del corso:", this.props.course_id)
        console.log("domande del corso:", this.state.questions)

        return(
            <div>
                <AllQuestions questions={this.state.questions}  course_id={this.props.course_id} />
                <table className="table is-hoverable is-fullwidth">
                    <tbody>
                    <NewQuestionCourse handleFormSubmit={this.handleFormSubmit} course_id={this.props.course_id} />
                    </tbody>
                </table>
            </div>
        )
    }
}