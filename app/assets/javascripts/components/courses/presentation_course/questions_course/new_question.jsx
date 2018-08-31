class NewQuestionCourse extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        let formFields = {};

        return(
            <tr>
                <td className="new-question-text">
                    <input ref={input => formFields.question_text = input} placeholder='Inserisci una nuova domanda' className="input is-medium" required />
                </td>
                <td>
                </td>
                <td>
                    <a className="button is-rounded is-link" onClick={ () => this.props.handleFormSubmit(this.props.course_id, this.props.user_id, formFields.question_text.value)}>Inserisci</a>
                </td>
            </tr>
        )
    }

}