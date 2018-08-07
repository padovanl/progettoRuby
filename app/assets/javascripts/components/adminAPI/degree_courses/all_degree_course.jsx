const AllDegreeCourses = (props) => {

    var courses = props.courses.map((course) => {
        return(
            <div key={course.id}>
                <DegreeCourse course={course} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
            </div>
        )
    })

    return(
        <div>
            {courses}
        </div>
    )
}