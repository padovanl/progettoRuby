class MainStatisticCourse extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <BodyStatisticCourse course_id={this.props.course_id} user_id={this.props.user_id}/>
            </div>
        )
    }
}