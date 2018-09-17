class BodyCourses2 extends React.Component {

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
        this.updateCourse = this.updateCourse.bind(this);
    }

    handleUpdate(course){
        if(course.name != '' && course.year != ''){
            let link = '/api/v1/degree_courses/' + this.props.degree_course_id + '/courses/' + course.id;
            fetch(link,
                {
                    method: 'PUT',
                    body: JSON.stringify({course: course}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                this.updateCourse(course)
            })
        }else{
            alert("I campi non possone essere vuoti!")
        }

    }

    updateCourse(course){
        let newCourses = this.state.courses.filter((f) => f.id !== course.id)
        newCourses.push(course)
        this.setState({
            courses: newCourses
        })
    }





    handleDelete(id){
        let linkDelete = '/api/v1/degree_courses/' + this.props.degree_course_id + '/courses/' + id;
        if(confirm('Sei sicuro di voler eliminare corso?')){
            fetch(linkDelete,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                if (response.ok){
                    this.deleteCourse(id)
                }else{
                    alert("errore")
                }
            })
        }

    }

    deleteCourse(id){
        let newCourses = this.state.courses.filter((f) => f.id !== id)
        this.setState({
            courses: newCourses
        })
    }

    handleFormSubmit(degree_course_id, name, year){
        let body = JSON.stringify({course: {degree_course_id: degree_course_id, name: name, year: year}});
        let linkNew = '/api/v1/degree_courses/' + this.props.degree_course_id + '/courses';
        if(name != '' && year != ''){
            if(isNaN(year)){
                toastr.error("L'anno deve essere un numero.")
            }else {
                fetch(linkNew, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body,
                }).then((response) => {
                    return response.json()
                })
                    .then((course) => {
                        if (course.error) {
                            alert("Errore!")
                        } else {
                            this.addNewCourse(course);
                        }

                    })
            }
        }else{
            alert('I campi non possono essere vuoti!')
        }


    }

    addNewCourse(course){
        this.setState({
            courses: this.state.courses.concat(course)
        })
    }

    componentDidMount(){
        let linkGet = '/api/v1/degree_courses/' + this.props.degree_course_id + '/courses.json';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ courses: data }) });
    }


    render(){
        return(
            <div>
                <AllCourses2 courses={this.state.courses} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} degree_course_id={this.props.degree_course_id} />
                <br/>
                <NewCourse2 handleFormSubmit={this.handleFormSubmit} degree_course_id={this.props.degree_course_id} />

            </div>
        )
    }
}