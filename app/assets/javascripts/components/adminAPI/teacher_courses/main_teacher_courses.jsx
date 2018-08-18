
class MainTeacherCourses extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <BodyTeacherCourses course_id={this.props.course_id} />
            </div>
        )
    }
}