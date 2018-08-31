class CourseQuestion extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        console.log("testo", this.props.courseQuestion.question)
        let question_text = <i>{this.props.courseQuestion.question}</i>;
        let question_freq = <i>{this.props.courseQuestion.frequency}</i>;

        return(
            <tr key={this.props.courseQuestion.id}>
                <td>{question_text}</td>
                <td>{question_freq}</td>
            </tr>
        )
    }
}