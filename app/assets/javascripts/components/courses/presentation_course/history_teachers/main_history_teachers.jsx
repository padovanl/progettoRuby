class MainHistoryTeachers extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <BodyHistoryTeachers course_id={this.props.course_id} teacher_history={this.props.teacher_history}/>
            </div>
        )
    }
}