const NewThesis = (props) => {

    let formFields = {}

    return(
        <tr>
            <td>
                <input ref={input => formFields.title = input} placeholder='Inserisci il titolo...' className="input is-medium" required id="insertNewThesis1"/>
            </td>
            <td>
                <textarea ref={input => formFields.content = input} placeholder='Inserisci la descrizione...' className="input is-medium" required id="insertNewThesis2"/>
            </td>
            <td>
                <select ref={input => formFields.teacher_id = input} >
                    <option value="1">Cesare Stefanelli</option>
                    <option value="2">Evelina Lamma</option>
                    <option value="3">Marco Gavanelli</option>
                </select>
            </td>
            <td>
                <a className="button is-rounded is-link is-fullwidth" onClick={ () => props.handleFormSubmit(formFields.title.value, formFields.content.value, formFields.teacher_id.value)}>Inserisci</a>
            </td>
        </tr>
    )

}