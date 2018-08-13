const NewTeacher = (props) => {

    let formFields = {}

    return(
        <tr>
            <td>
                <input ref={input => formFields.name = input} placeholder='Inserisci il nome...' className="input is-medium" required id="insertNewTeacher1"/>
            </td>
            <td>
                <input ref={input => formFields.surname = input} placeholder='Inserisci il cognome...' className="input is-medium" required id="insertNewTeacher2"/>
            </td>
            <td>
                <input ref={input => formFields.link_cv = input} placeholder='Inserisci il link alla pagina del prof...' className="input is-medium" required id="insertNewTeacher3"/>
            </td>
            <td>
                <a className="button is-rounded is-link is-fullwidth" onClick={ () => props.handleFormSubmit(formFields.name.value, formFields.surname.value, formFields.link_cv.value)}>Inserisci</a>
            </td>
        </tr>
    )

}