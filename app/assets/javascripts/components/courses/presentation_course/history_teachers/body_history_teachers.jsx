class BodyHistoryTeachers extends React.Component {

    constructor(props){
        super(props);
    }
    render(){

        return(
            <div>
                <AllHistoryTeachers teachers={this.props.teachers} />
            </div>
        )
    }
}