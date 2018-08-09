const NewDegreeCourse = (props) => {

    let formFields = {}

    return(
        <tr>
            <td>
                <input ref={input => formFields.name = input} placeholder='Inserisci il nome del corso di laurea' className="input is-medium" required id="insertNewDegree"/>
            </td>
            <td>
                <div className="select">
                    <select ref={input => formFields.tipo = input} className="input is-medium" >
                        <option value="Triennale">Laurea Triennale</option>
                        <option value="Magistrale">Laurea Magistrale</option>
                    </select>
                </div>
            </td>
            <td>
                <a className="button is-rounded is-link is-fullwidth" onClick={ () => props.handleFormSubmit(formFields.name.value, formFields.tipo.value)}>Inserisci</a>
            </td>
        </tr>
    )

}