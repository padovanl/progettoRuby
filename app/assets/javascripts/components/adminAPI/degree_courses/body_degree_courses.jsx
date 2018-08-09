class BodyDegreeCourses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewCourse = this.addNewCourse.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateCourse = this.updateCourse.bind(this)
    }

    handleUpdate(course){
        fetch(`http://localhost:3000/api/v1/degree_courses/${course.id}`,
            {
                method: 'PUT',
                body: JSON.stringify({degree_course: course}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            this.updateCourse(course)
        })
    }

    updateCourse(course){
        let newCourses = this.state.courses.filter((f) => f.id !== course.id)
        newCourses.push(course)
        this.setState({
            courses: newCourses
        })
    }

    handleDelete(id){
        fetch(`http://localhost:3000/api/v1/degree_courses/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            this.deleteCourse(id)
        })
    }

    deleteCourse(id){
        newCourse = this.state.courses.filter((course) => course.id !== id)
        this.setState({
            courses: newCourse
        })
    }

    handleFormSubmit(name, tipo){
        let body = JSON.stringify({degree_course: {name: name, tipo:   tipo } })

        fetch('http://localhost:3000/api/v1/degree_courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response) => {return response.json()})
            .then((course)=>{
                this.addNewCourse(course)
            })

    }

    addNewCourse(course){
        this.setState({
            courses: this.state.courses.concat(course)
        })
    }

    componentDidMount(){
        fetch('/api/v1/degree_courses.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ courses: data }) });
    }


    render(){
        return(
            <div>

                <AllDegreeCourses courses={this.state.courses} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} />
                <table className="table is-hoverable is-fullwidth">
                    <tbody>
                        <NewDegreeCourse handleFormSubmit={this.handleFormSubmit} />
                    </tbody>
                </table>
            </div>
        )
    }
}