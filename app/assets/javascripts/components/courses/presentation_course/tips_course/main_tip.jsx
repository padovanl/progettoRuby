class MainTip extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <BodyTip course_id={this.props.course_id}
                         current_user={this.props.current_user}
                         details_follow_course={this.props.details_follow_course}/>
            </div>
        )
    }
}