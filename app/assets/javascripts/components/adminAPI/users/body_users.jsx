class BodyUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        /*this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTeacher = this.addNewTeacher.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTeacher = this.deleteTeacher.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateTeacher = this.updateTeacher.bind(this)*/
    }




    componentDidMount(){
        fetch('/api/v1/users.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ users: data }) });
    }


    render(){
        return(
            <div>
                <AllUsers users={this.state.users} />
            </div>
        )
    }
}