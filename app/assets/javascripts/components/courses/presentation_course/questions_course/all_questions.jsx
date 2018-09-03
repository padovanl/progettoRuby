class AllQuestions extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var questions = this.props.questions.map((courseQuestion) => {
            return(
                <CourseQuestion courseQuestion={courseQuestion} user_id={this.props.user_id} handleDelete={this.props.handleDelete} handleUpdate={this.props.handleUpdate} show_details = {this.props.show_details} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-fullwidth is-centered">
                    <thead>
                    <tr>
                        <th className="question-text">Domanda</th>
                        <th>freq.</th>
                        { this.props.show_details ? <th>Dettagli</th> : null }
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