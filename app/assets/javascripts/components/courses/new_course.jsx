const NewCourse = (props) => {

    let formFields = {}

    return(
        <div>
            <input ref={input => formFields.name = input} placeholder='Enter the name of the item'/>
            <input ref={input => formFields.year = input} placeholder='Enter a year' />
            <input ref={input => formFields.degree_course_id = input} placeholder='Enter a degree_course_id' />
            <button onClick={ () => props.handleFormSubmit(formFields.name.value, formFields.year.value, formFields.degree_course_id.value)}>Submit</button>
        </div>
    )

}