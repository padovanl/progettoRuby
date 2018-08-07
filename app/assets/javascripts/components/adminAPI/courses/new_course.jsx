const NewCourse = (props) => {

    let formFields = {}

    return(
        <div>
            <input ref={input => formFields.name = input} placeholder='Enter the name of the item' required="true" />
            <input ref={input => formFields.year = input} placeholder='Enter a year' required="true" />
            <select ref={input => formFields.degree_course_id = input} >
                <option value="1">Laurea Triennale in Informatica</option>
                <option value="2">Laurea Triennale in Ingegneria Informatica e Elettronica</option>
                <option value="3">Laurea Magistrale in Ingegneria Informatica e dell'Automazione</option>
                <option value="4">Laurea Magistrale in Ingegneria Elettronica e delle Telecomunicazioni</option>
            </select>
            <button onClick={ () => props.handleFormSubmit(formFields.name.value, formFields.year.value, formFields.degree_course_id.value)}>Submit</button>
        </div>
    )

}