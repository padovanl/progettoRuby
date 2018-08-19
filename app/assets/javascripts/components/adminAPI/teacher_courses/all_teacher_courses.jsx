

class AllTeacherCourses extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var teachers = this.props.teachers.map((teacherCourse) => {
            return(
                <TeacherCourse teacherCourse={teacherCourse} handleDelete={this.props.handleDelete} handleUpdate={this.props.handleUpdate} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>A.A.</th>
                        <th>Opzioni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers}
                    </tbody>
                </table>
            </div>
        )
    }

}