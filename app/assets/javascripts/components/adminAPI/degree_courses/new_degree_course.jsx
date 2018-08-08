const NewDegreeCourse = (props) => {

    let formFields = {}

    return(
        <div>
            <input ref={input => formFields.name = input} placeholder='Enter the name of the item' required="true" />
            <select ref={input => formFields.tipo = input} >
                <option value="Triennale">Laurea Triennale</option>
                <option value="Magistrale">Laurea Magistrale</option>
            </select>
            <button onClick={ () => props.handleFormSubmit(formFields.name.value, formFields.tipo.value)}>Submit</button>
        </div>
    )

}