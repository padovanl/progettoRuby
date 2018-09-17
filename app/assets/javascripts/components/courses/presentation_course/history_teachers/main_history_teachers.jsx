class MainHistoryTeachers extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <BodyHistoryTeachers teachers={this.props.teachers} />
            </div>
        )
    }
}