const NewTag = (props) => {

    let formFields = {}

    return(
        <tr>
            <td>
                <input ref={input => formFields.name = input} placeholder='Inserisci il nome del tag' className="input is-medium" required id="insertNewTag"/>
            </td>
            <td>
                <a className="button is-rounded is-link is-fullwidth" onClick={ () => props.handleFormSubmit(formFields.name.value)}>Inserisci</a>
            </td>
        </tr>
    )

}