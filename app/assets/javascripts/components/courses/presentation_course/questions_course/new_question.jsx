class NewQuestionCourse extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        let formFields = {};

        return(
            <tr>
                <td className="new-question-text">
                    <input ref={input => formFields.question_text = input}
                           value={ this.props.content_question }
                           placeholder='Inserisci una nuova domanda'
                           className="input is-medium"
                           onChange={ (e) => this.props.handleChange(e)}
                           required />
                </td>
                <td>
                </td>
                <td>
                    <a className="button is-rounded is-link" onClick={ () => this.props.handleFormSubmit(this.props.course_id, this.props.current_user.id, formFields.question_text.value)}>Inserisci</a>
                </td>
            </tr>
        )
    }

}