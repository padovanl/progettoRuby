class MainQuestion extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <BodyQuestion course_id={this.props.course_id} user_id={this.props.user_id} />
            </div>
        )
    }
}