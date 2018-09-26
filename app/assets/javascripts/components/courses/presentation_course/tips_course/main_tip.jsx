class MainTip extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <BodyTip course_id={this.props.course_id}
                         user_id={this.props.user_id}
                         details_follow_course={this.props.details_follow_course}/>
            </div>
        )
    }
}