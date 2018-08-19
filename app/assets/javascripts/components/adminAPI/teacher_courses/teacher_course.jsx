class TeacherCourse extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
        if(this.state.editable){
            let course_id = this.course_id.value;
            let teacher_id = this.teacher_id.value;
            let id = this.props.teacherCourse.id;
            let year = this.year.value;
            let teacherCourse = {id: id, course_id: course_id, teacher_id: teacher_id, year: year};
            this.props.handleUpdate(teacherCourse);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){

        let teacher_name = <i>{this.props.teacherCourse.teacher.name}</i>;
        let teacher_surname = <i>{this.props.teacherCourse.teacher.surname}</i>;
        let year = <i>{this.props.teacherCourse.year}</i>;
        let pulsante = <i className="fas fa-pen"></i>;


        return(
            <tr key={this.props.teacherCourse.id}>
                <td>{teacher_name}</td>
                <td>{teacher_surname}</td>
                <td>{year}</td>
                <td>
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.teacherCourse.id)} title="Elimina"><i className="fas fa-times"></i></a>
                </td>
            </tr>

        )
    }
}