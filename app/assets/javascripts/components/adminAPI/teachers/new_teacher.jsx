const NewTeacher = (props) => {

    let formFields = {}

    let style = {
        marginTop: "1%",
        marginBottom: "1%",
        marginRight: "1%",
        marginLeft: "1%",
    };

    let hideStyle = {
        display: "none",
    };



    return(
        <div style={hideStyle} id="insertTeacherDiv">
            <fieldset>
                <legend>Inserisci nuovo professore</legend>
                <div style={style}>
                    <input ref={input => formFields.name = input} placeholder='Inserisci il nome...' className="input is-medium" required id="insertNewTeacher1"/>
                    <br/>
                    <br/>
                    <input ref={input => formFields.surname = input} placeholder='Inserisci il cognome...' className="input is-medium" required id="insertNewTeacher2"/>
                    <br/>
                    <br/>
                    <input ref={input => formFields.link_cv = input} placeholder='Inserisci il link alla pagina del prof...' className="input is-medium" required id="insertNewTeacher3"/>
                    <br/>
                    <br/>
                    <a className="button is-rounded is-link is-fullwidth" onClick={ () => props.handleFormSubmit(formFields.name.value, formFields.surname.value, formFields.link_cv.value)}>Inserisci</a>
                </div>
            </fieldset>
        </div>
    )

}