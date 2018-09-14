const NewTag = (props) => {

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


        <div style={hideStyle} id="insertTagDiv">
        <fieldset>
        <legend>Inserisci nuovo tag</legend>
            <div style={style}>
                <input ref={input => formFields.name = input} placeholder='Inserisci il nome del tag' className="input is-medium" required id="insertNewTag"/>
                <br/>
                <br/>
                <a className="button is-rounded is-link is-fullwidth" onClick={ () => props.handleFormSubmit(formFields.name.value)}>Inserisci</a>
            </div>
            </fieldset>
        </div>
    )

}