class NewTipCourse extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        let formFields = {};

        return(
            <tr>
                <td className="new-question-text">
                    <input ref={input => formFields.tip_text = input} placeholder='Inserisci un nuovo suggerimento' className="input is-medium" required />
                </td>
                <td>
                </td>
                <td>
                    <a className="button is-rounded is-link" onClick={ () => this.props.handleFormSubmit(this.props.course_id, this.props.user_id, formFields.tip_text.value)}>Inserisci</a>
                </td>
            </tr>
        )
    }

}