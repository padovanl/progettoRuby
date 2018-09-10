class MainSurvey extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <BodySurvey course_id={this.props.course_id} user_id={this.props.user_id} user_courses_id = {this.props.user_courses_id} />
            </div>
        )
    }
}