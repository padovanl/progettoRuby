class Course extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
        if(this.state.editable){
            let name = this.name.value;
            let year = this.year.value;
            let id = this.props.course.id;
            let degree_course_id = this.props.course.degree_course_id;
            let course = {id: id, name: name, year: year, degree_course_id: degree_course_id};
            this.props.handleUpdate(course);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){
        let name = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.course.name}/>:<p>{this.props.course.name}</p>
        let year = this.state.editable ? <input type='text' ref={input => this.year = input} defaultValue={this.props.course.year}/>:<p>{this.props.course.year}</p>
        let degree_course_id = this.state.editable ? <input type='text' ref={input => this.degree_course_id = input} defaultValue={this.props.course.degree_course_id}/>:<p>{this.props.course.degree_course_id}</p>
        return(
            <div>
                {name}
                {year}
                {degree_course_id}
                <button onClick={() => this.handleEdit()}>{this.state.editable? 'Submit' : 'Edit'}</button>
                <button onClick={() => this.props.handleDelete(this.props.course.id)}>Delete</button>
            </div>
        )
    }
}