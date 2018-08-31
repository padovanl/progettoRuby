class AllQuestions extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var questions = this.props.questions.map((courseQuestion) => {
            return(
                <CourseQuestion courseQuestion={courseQuestion} user_id={this.props.user_id} handleDelete={this.props.handleDelete} handleUpdate={this.props.handleUpdate} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-fullwidth is-centered">
                    <thead>
                    <tr>
                        <th className="question-text">Domanda</th>
                        <th>freq.</th>
                        <th>Dettagli</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions}
                    </tbody>
                </table>
            </div>
        )
    }

}