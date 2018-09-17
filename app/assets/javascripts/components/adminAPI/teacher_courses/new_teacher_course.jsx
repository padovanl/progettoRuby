


class NewTeacherCourse extends React.Component {

    constructor(props){
        super(props);
        this.temp = [];
    }
    getTeachers(){
        fetch('/api/v1/teachers.json')
            .then((response) => {return response.json()})
            .then((data) => { this.temp = data; });
    }


    render() {
        let formFields = {};
        this.getTeachers();
        var teacherList = this.temp;

        let style = {
            marginTop: "1%",
            marginBottom: "1%",
            marginRight: "1%",
            marginLeft: "1%",
        };

        let hideStyle = {
            display: "none",
        };

        let centerStyle = {
            display: "flex",
        };

        
        return(


            <div style={hideStyle} id="insertDiv">
                <fieldset>
                    <legend>Aggiungi nuovo professore</legend>
                    <div style={style}>
                        <input ref={input => formFields.course_id = input} type="hidden" value={this.props.course_id}/>
                        <input ref={input => formFields.year = input} placeholder='Inserisci anno accademico' className="input is-medium" required />
                        <br/>
                        <br/>
                        <div>
                            <div className="select" style={centerStyle}>
                                <select ref={input => formFields.teacher_id = input} className="input is-medium" >
                                    {teacherList.map(function(t){
                                        return <option key={t.id} value={t.id}>{t.name}&nbsp;{t.surname}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <a className="button is-rounded is-link is-fullwidth" onClick={ () => this.props.handleFormSubmit(formFields.course_id.value, formFields.teacher_id.value, formFields.year.value)}>Inserisci</a>
                    </div>
                </fieldset>
            </div>

        )
    }

}