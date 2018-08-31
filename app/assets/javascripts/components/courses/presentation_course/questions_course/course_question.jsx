class CourseQuestion extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        console.log("testo", this.props.courseQuestion.question)
        let question_text = <i>{this.props.courseQuestion.question}</i>;
        let question_freq = <i>{this.props.courseQuestion.frequency}</i>;
        const delete_button_item = <td> <a className="button is-rounded is-danger"
                                      onClick={() => this.props.handleDelete(this.props.courseQuestion.id)}
                                      title="Elimina">
                                    <i className="fas fa-times"></i>
                                    </a>
                              </td>
        return(
            <tr key={this.props.courseQuestion.id}>
                <td>{question_text}</td>
                <td>{question_freq}</td>
                { this.props.courseQuestion.user_id == this.props.user_id ? delete_button_item  : null}
            </tr>
        )
    }
}