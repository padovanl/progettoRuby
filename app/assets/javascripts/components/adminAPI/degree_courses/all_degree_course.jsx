const AllDegreeCourses = (props) => {

    var courses = props.courses.map((course) => {
        return(
                <DegreeCourse course={course} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
        )
    })

    return(
        <div>
            <table className="table is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {courses}
                </tbody>
            </table>

        </div>
    )
}