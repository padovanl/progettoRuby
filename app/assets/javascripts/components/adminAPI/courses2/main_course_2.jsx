
class MainCourses2 extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <BodyCourses2 degree_course_id={this.props.degree_course_id} />
            </div>
        )
    }
}