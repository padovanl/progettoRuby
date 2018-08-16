const NewThesisTag = (props) => {

    let formFields = {}

    return(
        <tr>
            <td>
                <input ref={input => formFields.thesis_id = input} type="hidden" value={props.thesis_id}/>
            </td>
            <td>
                <input ref={input => formFields.tag_id = input} placeholder='Inserisci id tag...' className="input is-medium" required id="insertNewTeacher2"/>
            </td>
            <td>
                <a className="button is-rounded is-link is-fullwidth" onClick={ () => props.handleFormSubmit(formFields.thesis_id.value, formFields.tag_id.value)}>Inserisci</a>
            </td>
        </tr>
    )

}