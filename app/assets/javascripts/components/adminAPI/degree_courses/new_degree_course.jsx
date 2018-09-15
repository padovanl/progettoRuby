const NewDegreeCourse = (props) => {

    let formFields = {};
    
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

        <div style={hideStyle} id="insertCdlDiv">
        <fieldset>
        <legend>Inserisci nuovo CdL</legend>
            <div style={style}>
                <input ref={input => formFields.name = input} placeholder='Inserisci il nome del corso di laurea' className="input is-medium" required id="insertNewDegree"/>
                <br/>
                <br/>
                <div className="select">
                    <select ref={input => formFields.tipo = input} className="input is-medium" >
                        <option value="Triennale">Laurea Triennale</option>
                        <option value="Magistrale">Laurea Magistrale</option>
                    </select>
                </div>
                <br/>
                <br/>
                <a className="button is-rounded is-link is-fullwidth" onClick={ () => props.handleFormSubmit(formFields.name.value, formFields.tipo.value)}>Inserisci</a>
            </div>
            </fieldset>
        </div>
    )

}