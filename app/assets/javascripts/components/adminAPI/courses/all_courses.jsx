const AllCourses = (props) => {

    var courses = props.courses.map((course) => {
        return(
            <div key={course.id}>
                <Course course={course} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
            </div>
        )
    })

    return(
        <div>
            {courses}
        </div>
    )
}