class BodyHistoryTeachers extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){

        return(
            <div>
                <AllHistoryTeachers teacher_history={this.props.teacher_history}/>
            </div>
        )
    }
}