

class AllCourses2 extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var courses = this.props.courses.map((course) => {
            return(
                <Course2 course={course} handleDelete={this.props.handleDelete} handleUpdate={this.props.handleUpdate} degree_course_id={this.props.degree_course_id} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Anno</th>
                        <th>Opzioni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses}
                    </tbody>
                </table>
            </div>
        )
    }

}