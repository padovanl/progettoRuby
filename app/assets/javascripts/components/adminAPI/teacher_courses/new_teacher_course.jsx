


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

        return(
            <tr>
                <td>
                    <input ref={input => formFields.course_id = input} type="hidden" value={this.props.course_id}/>
                    <input ref={input => formFields.year = input} placeholder='Inserisci anno accademico' className="input is-medium" required />
                </td>
                <td>
                    <div className="select">
                        <select ref={input => formFields.teacher_id = input} className="input is-medium" >
                            {teacherList.map(function(t){
                                return <option key={t.id} value={t.id}>{t.name}&nbsp;{t.surname}</option>
                            })}
                        </select>
                    </div>
                </td>
                <td>
                    <a className="button is-rounded is-link is-fullwidth" onClick={ () => this.props.handleFormSubmit(formFields.course_id.value, formFields.teacher_id.value, formFields.year.value)}>Inserisci</a>
                </td>
            </tr>
        )
    }

}