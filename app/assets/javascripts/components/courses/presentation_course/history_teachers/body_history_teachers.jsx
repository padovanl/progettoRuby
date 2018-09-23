class BodyHistoryTeachers extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            teachers: [],
        };
    }

    getData1() {
        let linkGet =  '/get_teachers_history/' + this.props.course_id;
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ teachers: data }) });
    }

    componentDidMount(){
        this.getData1();
    }

    render(){

        return(
            <div>
                <AllHistoryTeachers teachers={this.state.teachers} />
            </div>
        )
    }
}