class MainQuestion extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <BodyQuestion course_id={this.props.course_id} />
            </div>
        )
    }
}