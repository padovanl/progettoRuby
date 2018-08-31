class AllQuestions extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var questions = this.props.questions.map((courseQuestion) => {
            return(
                <CourseQuestion courseQuestion={courseQuestion} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-fullwidth is-centered">
                    <thead>
                    <tr>
                        <th>Domanda</th>
                        <th>frequenza</th>
                        <th></th>
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