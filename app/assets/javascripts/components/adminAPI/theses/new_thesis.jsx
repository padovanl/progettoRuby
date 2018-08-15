/*const NewThesis = (props) => {

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

}*/

class NewThesis extends React.Component {

    constructor(props){
        super(props);
        this.temp = [];
    }
    getTeachers(){
        fetch('/api/v1/teachers.json')
            .then((response) => {return response.json()})
            .then((data) => {this.temp = data});
    }



    render(){
        let formFields = {};
        this.getTeachers();
        var teachersList = this.temp;
        const centerStyle = {
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 0,
            marginBottom: 0,
        };

        return(

            <div className="modal" id="modalTesi">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Nuova tesi</p>
                        <button className="delete" aria-label="close" onClick={function () {
                            $("#modalTesi").removeClass("is-active");
                        }}></button>
                    </header>
                    <section className="modal-card-body">
                        <input ref={input => formFields.title = input} placeholder='Inserisci il titolo...' className="input is-medium" required id="insertNewThesis1"/>
                        <br/>
                        <br/>
                        <textarea style={{height: 300}} ref={input => formFields.content = input} placeholder='Inserisci la descrizione...' className="input is-medium" required id="insertNewThesis2"/>
                        <br/>
                        <br/>
                        <div className="columns">
                            <div className="column"></div>
                            <div className="column  is-5">
                                <div className="select" style={centerStyle}>
                                    <select ref={input => formFields.teacher_id = input} className="input is-medium" >
                                        {teachersList.map(function(t){
                                            return <option value={t.id}>{t.name}&nbsp;{t.surname}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="column"></div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <a className="button is-rounded is-link" onClick={ () => this.props.handleFormSubmit(formFields.title.value, formFields.content.value, formFields.teacher_id.value)}>Inserisci</a>
                        <button className="button is-rounded" onClick={function () {
                            $("#modalTesi").removeClass("is-active");
                        }}>Chiudi</button>
                    </footer>
                </div>
            </div>



        )
    }
}

