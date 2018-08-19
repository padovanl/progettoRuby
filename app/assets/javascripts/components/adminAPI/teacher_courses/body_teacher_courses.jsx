class BodyTeacherCourses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTeacherCourse = this.addNewTeacherCourse.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTeacherCourse = this.deleteTeacherCourse.bind(this);
    }



    handleDelete(id){
        let linkDelete = '/api/v1/course/' + this.props.course_id + '/teacher_courses/' + id
        if(confirm('Sei sicuro di voler eliminare questo collegamento?')){
            fetch(linkDelete,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                if (response.ok){
                    this.deleteTeacherCourse(id)
                }else{
                    alert("errore")
                }
            })
        }

    }

    deleteTeacherCourse(id){
        let newTeacherCourses = this.state.teachers.filter((f) => f.id !== id)
        this.setState({
            teachers: newTeacherCourses
        })
    }

    handleFormSubmit(course_id, teacher_id, year){
        let body = JSON.stringify({teacherCourse: {course_id: course_id, teacher_id: teacher_id, year: year}});
        let linkNew = '/api/v1/course/' + this.props.course_id + '/teacher_courses';
        if(teacher_id != '' && year != ''){
            fetch(linkNew, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            }).then((response) => {return response.json()})
                .then((teacherCourse)=>{
                    if(teacherCourse.error){
                        alert("Errore!")
                    }else{
                        this.addNewTeacherCourse(teacherCourse);
                    }

                })
        }else{
            alert('I campi non possono essere vuoti!')
        }


    }

    addNewTeacherCourse(teacherCourse){
        this.setState({
            teachers: this.state.teachers.concat(teacherCourse)
        })
    }

    componentDidMount(){
        let linkGet =  '/api/v1/course/' + this.props.course_id + '/teacher_courses.json';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ teachers: data }) });
    }


    render(){
        return(
            <div>
                <AllTeacherCourses teachers={this.state.teachers} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} course_id={this.props.course_id} />
                <table className="table is-hoverable is-fullwidth">
                    <tbody>
                    <NewTeacherCourse handleFormSubmit={this.handleFormSubmit} course_id={this.props.course_id} />
                    </tbody>
                </table>
            </div>
        )
    }
}