class NewTipCourse extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        let formFields = {};

        return(
            <tr>
                <td className="new-question-text">
                    <input ref={input => formFields.tip_text = input}
                           placeholder='Inserisci un nuovo suggerimento'
                           className="input is-medium"
                           value={ this.props.content_tip}
                           onChange={ (e) => this.props.handleChange(e)}
                           required />
                </td>
                <td>
                </td>
                <td>
                    <a className="button is-rounded is-link" onClick={ () => this.props.handleFormSubmit(this.props.course_id, this.props.current_user.id, formFields.tip_text.value)}>Inserisci</a>
                </td>
            </tr>
        )
    }

}