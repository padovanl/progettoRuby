class AllQuestions extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var questions = this.props.questions.map((courseQuestion) => {
            return(
                <CourseQuestion courseQuestion={courseQuestion}
                                user_id={this.props.user_id}
                                handleDelete={this.props.handleDelete}
                                handleUpdate={this.props.handleUpdate}
                                show_details = {this.props.show_details}
                                show_quotes = {this.props.show_quotes}
                                handleQuoteUp={this.props.handleQuoteUp}
                                handleQuoteDown = {this.props.handleQuoteDown}
                                course_id={this.props.course_id}
                                activeModal={this.props.activeModal} />
            )
        })

        var scroolStyle = {
            overflowX: "auto",
        };


        return(
            <div style={scroolStyle}>
                {questions.length ? <table className="table is-hoverable is-fullwidth is-centered">
                    <thead>
                    <tr>
                        <th className="question-text-column">Domanda</th>
                        <th className="frequency-column has-text-centered">freq.</th>
                        { this.props.show_details || this.props.show_quotes ? <th className="details-column">Dettagli</th> : null }
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions}
                    </tbody>
                </table> :  <div>Nessuna domanda inserita</div>}
            </div>
        )
    }

}