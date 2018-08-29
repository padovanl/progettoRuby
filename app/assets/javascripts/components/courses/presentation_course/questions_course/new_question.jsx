class NewQuestionCourse extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        let formFields = {};

        return(
            <tr>
                <td>
                    <input ref={input => formFields.question_text = input} type="hidden" value={this.props.course_id}/>
                    <input ref={input => formFields.year = input} placeholder='Inserisci anno accademico' className="input is-medium" required />
                </td>
                <td>
                </td>
                <td>
                    <a className="button is-rounded is-link is-fullwidth" onClick={ () => this.props.handleFormSubmit(formFields.course_id.value, formFields.teacher_id.value, formFields.year.value)}>Inserisci</a>
                </td>
            </tr>
        )
    }

}